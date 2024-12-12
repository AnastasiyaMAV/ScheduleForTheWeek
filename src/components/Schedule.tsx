import { dayToTextMap, dayToWeightMap, days } from "@/const/schedule";
import { badgeActive } from "@/styles/schedule";
import { TDay, TScheduleDay, TScheduleProps } from "@/types/general";
import { defaultState, parseTimeString, serializeTimeString } from "@/utils/general";
import { Badge, Box, Button, Link, Paper, Popover, TextField, Typography } from "@mui/material";
import { useStore } from "@nanostores/react";
import { eachMinuteOfInterval, isAfter, isEqual, isValid, isWithinInterval, set } from "date-fns";
import { Fragment, KeyboardEventHandler, useMemo, useRef } from "react";

import { popoversState } from "@/stores/popovers";
import { scheduleState } from "@/stores/schedule";

import { ButtonsGroup } from "./ButtonsGroup";
import { MaximumNumberOfIntervals } from "./MaximumNumberOfIntervals";
import { PopoverDetails } from "./PopoverDetails";
import { TextFieldCustom } from "./TextFieldCustom";
import { TitleButtons } from "./TitleButtons";

export const Schedule = ({
	onChange,
	value,
	defaultAllDaysInterval,
	defaultOneDayInterval,
	...props
}: TScheduleProps) => {
	const currentFocusDayRef = useRef<TDay | null>(null);
	const triggerInputsRef = useRef<HTMLElement | null>(null);

	const { inputValues, editedIndex } = useStore(scheduleState.$store);
	const { isOpenInterval, anchorElInterval, anchorElDetails } = useStore(popoversState.$store);

	const schedule = useMemo(() => value || defaultState, [value]);

	const scheduleAsArray = useMemo(() => {
		if (schedule.isAllDaysMode) {
			return [
				{
					day: TDay.MONDAY,
					dayText: undefined,
					daysMap: {
						intervals: schedule.daysMap[TDay.MONDAY]?.intervals ? schedule.daysMap[TDay.MONDAY]?.intervals : [],
					},
					dayWeight: undefined,
				},
			];
		}

		return (Object.entries(schedule.daysMap) as [TDay, TScheduleDay][])
			.map(([day, daysMap]) => ({
				day,
				daysMap,
				dayText: dayToTextMap[day],
				dayWeight: dayToWeightMap[day],
			}))
			.filter(v => (props.previewMode ? v.daysMap.intervals.length : true))
			.sort((a, b) => a.dayWeight - b.dayWeight);
	}, [props.previewMode, schedule.daysMap, schedule.isAllDaysMode]);

	const setInputValue = (target: "first" | "second" | "text", value: string) => {
		const newInputValues = { ...inputValues, [target]: value, error: "" };
		scheduleState.setInputValues(newInputValues);

		if ([newInputValues.first, newInputValues.second].some(v => v.length !== 5)) return;

		const firstTime = parseTimeString(newInputValues.first);
		const secondTime = parseTimeString(newInputValues.second);

		const isInterval = () => {
			const minuteOfIntervals = schedule.daysMap[currentFocusDayRef.current!]?.intervals
				.filter((_, index) => (editedIndex !== undefined ? index !== editedIndex : true))
				.map(v => {
					const start = new Date();
					start.setHours(v.from.hours);
					start.setMinutes(v.from.minutes);

					const end = new Date();
					end.setHours(v.to.hours);
					end.setMinutes(v.to.minutes);

					return eachMinuteOfInterval({ start, end });
				})
				.flat();

			const intervals = schedule.daysMap[currentFocusDayRef.current!]?.intervals
				.filter((_, index) => (editedIndex !== undefined ? index !== editedIndex : true))
				.map(v => {
					const start = new Date();
					start.setHours(v.from.hours);
					start.setMinutes(v.from.minutes);
					start.setSeconds(0);
					start.setMilliseconds(0);

					const end = new Date();
					end.setHours(v.to.hours);
					end.setMinutes(v.to.minutes);
					end.setSeconds(0);
					end.setMilliseconds(0);
					return { start, end };
				});

			if (!minuteOfIntervals || !minuteOfIntervals.length) return false;

			const isInputDatesInInterval = [firstTime, secondTime].some(v => {
				return intervals?.some(date => {
					return isWithinInterval(set(v.date, { seconds: 0, milliseconds: 0 }), {
						start: date.start,
						end: date.end,
					});
				});
			});

			const isDatesInInputRange = minuteOfIntervals.some(date => {
				return isWithinInterval(set(date, { seconds: 0, milliseconds: 0 }), {
					start: firstTime.date,
					end: secondTime.date,
				});
			});

			return isInputDatesInInterval || isDatesInInputRange;
		};

		const rules = [
			[[firstTime.m, secondTime.m].some(v => v > 59), "Неверный формат времени"],
			[[firstTime.h, secondTime.h].some(v => v > 23), "Неверный формат времени"],
			[[firstTime.date, secondTime.date].some(v => !isValid(v)), "Введите корректное время"],
			[firstTime.h > 0 && secondTime.h === 0, "Укажите конец суток в виде 23:59"],
			[isAfter(firstTime.date, secondTime.date), "Начало интервала должно быть раньше, чем окончание"],
			[isEqual(firstTime.date, secondTime.date), "Интервал должен длиться хотя бы 1 минуту"],
			[isInterval(), "Интервалы не должны пересекаться"],
		] as const;

		const [, ruleViolation] = rules.find(([r]) => r) || [];

		ruleViolation &&
			scheduleState.setInputValues({
				first: newInputValues.first,
				second: newInputValues.second,
				id: newInputValues.id,
				text: newInputValues.text,
				error: ruleViolation!,
			});
	};

	const isIncorrectInputValues =
		!inputValues.first ||
		!inputValues.second ||
		!!inputValues.error ||
		[inputValues.first, inputValues.second].some(v => v.length !== 5);

	const handleOpenInputs = (day: TDay, selfElement: HTMLAnchorElement | HTMLElement, editedIndex?: number) => {
		if (props.previewMode) return;
		popoversState.setAnchorElInterval(selfElement);
		currentFocusDayRef.current = day;
		triggerInputsRef.current = selfElement;
		popoversState.setIsOpenInterval(true);

		if (editedIndex !== undefined) {
			const intervalValues = schedule.daysMap[day]?.intervals.at(editedIndex);
			if (!intervalValues) return;

			scheduleState.setEditedIndex(editedIndex);
			scheduleState.setInputValues({
				error: "",
				first: serializeTimeString(intervalValues.from),
				second: serializeTimeString(intervalValues.to),
				text: intervalValues.details ? intervalValues.details : undefined,
			});
		}
	};

	const cleanUp = () => {
		scheduleState.setInputValues({ first: "", second: "", error: "", text: "" });
		popoversState.setIsOpenInterval(false);
		scheduleState.setEditedIndex(undefined);

		currentFocusDayRef.current = null;
		triggerInputsRef.current = null;
	};

	const handleAddNewInterval = () => {
		const firstTime = parseTimeString(inputValues.first);
		const secondTime = parseTimeString(inputValues.second);

		const newSchedule = structuredClone(schedule);
		const processedDays = schedule.isAllDaysMode ? days.map(v => v.value) : [currentFocusDayRef.current!];

		for (const d of processedDays) {
			if (editedIndex === undefined) {
				newSchedule.daysMap[d] || (newSchedule.daysMap[d] = { intervals: [] });

				newSchedule.daysMap[d]?.intervals.push({
					to: { hours: secondTime.h, minutes: secondTime.m, seconds: 0, nanos: 0 },
					from: { hours: firstTime.h, minutes: firstTime.m, seconds: 0, nanos: 0 },
					details: inputValues?.text ? inputValues.text : undefined,
					id: inputValues.id ? inputValues.id : Date.now() + Math.random(),
				});
			}

			if (editedIndex !== undefined) {
				newSchedule.daysMap[d] = {
					...newSchedule.daysMap[d],
					intervals: (newSchedule.daysMap[d]?.intervals || []).map((v, k) =>
						k === editedIndex
							? {
									to: { hours: secondTime.h, minutes: secondTime.m, seconds: 0, nanos: 0 },
									from: { hours: firstTime.h, minutes: firstTime.m, seconds: 0, nanos: 0 },
									details: inputValues?.text ? inputValues.text : undefined,
									id: inputValues.id ? inputValues.id : Date.now() + Math.random(),
							  }
							: v
					),
				};
			}
		}

		onChange?.(newSchedule);
		cleanUp();
	};

	const handleRemoveInterval = () => {
		if (!editedIndex === undefined) return;

		const newSchedule = structuredClone(schedule);
		const processedDays = schedule.isAllDaysMode ? days.map(v => v.value) : [currentFocusDayRef.current!];

		for (const d of processedDays) {
			newSchedule.daysMap[d] = {
				...newSchedule.daysMap[d],
				intervals: (newSchedule.daysMap[d]?.intervals || []).filter((_, idx) => idx !== editedIndex),
			};
		}

		onChange?.(newSchedule);
		cleanUp();
	};

	const handleEditInterval: KeyboardEventHandler = event => {
		if (event.code !== "Enter" || isIncorrectInputValues || editedIndex === undefined) return;
		handleAddNewInterval();
		popoversState.setIsOpenInterval(false);
		cleanUp();
	};

	return (
		<>
			<Popover
				id={isOpenInterval ? "simple-popover" : undefined}
				open={isOpenInterval}
				anchorEl={anchorElInterval}
				onClose={() => {
					popoversState.setIsOpenInterval(false);
					popoversState.setAnchorElInterval(null);
					setTimeout(() => cleanUp(), 500);
				}}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				onKeyDown={handleEditInterval}
			>
				<Box>
					<Box sx={{ display: "flex", gap: "12px", p: "12px" }}>
						<Box sx={{ flex: "1 1 0" }}>
							<TextField
								label="Начало интервала"
								placeholder="00:00"
								value={inputValues.first}
								onChange={v => setInputValue("first", v.target.value)}
								slotProps={{
									input: {
										// eslint-disable-next-line @typescript-eslint/ban-ts-comment
										// @ts-expect-error
										inputComponent: TextFieldCustom as unknown,
									},
								}}
								variant="standard"
							/>
						</Box>
						<Box sx={{ flex: "1 1 0" }}>
							<TextField
								label="Конец интервала"
								placeholder="00:00"
								value={inputValues.second}
								onChange={v => setInputValue("second", v.target.value)}
								slotProps={{
									input: {
										// eslint-disable-next-line @typescript-eslint/ban-ts-comment
										// @ts-expect-error
										inputComponent: TextFieldCustom as unknown,
									},
								}}
								variant="standard"
							/>
						</Box>
					</Box>
					<Typography sx={{ marginTop: "12px", marginLeft: "12px" }} variant="caption" color="textSecondary">
						Детали задания
					</Typography>
					<TextField
						placeholder="Здесь можно описать своё задание"
						value={inputValues.text ? inputValues.text : undefined}
						onChange={v => setInputValue("text", v.target.value)}
						sx={{ paddingLeft: "12px", paddingRight: "12px", paddingBottom: "3px", width: "100%" }}
						multiline
						rows={4}
					/>
				</Box>

				{inputValues.error && (
					<Box
						sx={{
							width: "300px",
							p: "12px",
							mt: "4px",
							color: "red",
						}}
					>
						<Typography variant="inherit">{inputValues.error}</Typography>
					</Box>
				)}

				{editedIndex === undefined && (
					<Button sx={{ mt: "12px" }} disabled={isIncorrectInputValues} onClick={handleAddNewInterval} fullWidth>
						Добавить
					</Button>
				)}

				{editedIndex !== undefined && schedule.daysMap[currentFocusDayRef.current!]?.intervals?.length !== 1 && (
					<Box sx={{ p: "5px", pt: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
						<Button onClick={handleRemoveInterval}>Удалить интервал</Button>
					</Box>
				)}
			</Popover>

			<Paper
				elevation={3}
				sx={{ width: "850px", m: "24px", p: "16px", borderRadius: "5px", display: "flex", flexDirection: "column" }}
			>
				<MaximumNumberOfIntervals />

				<div>
					{props.previewMode || (
						<TitleButtons
							schedule={schedule}
							onChange={onChange}
							defaultAllDaysInterval={defaultAllDaysInterval}
							defaultOneDayInterval={defaultOneDayInterval}
						/>
					)}

					<Box sx={{ mt: props.previewMode ? 0 : "24px" }}>
						<Box sx={{ display: "flex", gap: "8px", flexDirection: "column" }}>
							{scheduleAsArray.map(({ day, daysMap, dayText }) => (
								<Box key={day} sx={{ display: "flex", gap: "6px", alignItems: "center" }}>
									<Box sx={{ flexBasis: "130px", flexShrink: 0 }}>
										<Typography variant="inherit">{schedule.isAllDaysMode ? "Все дни недели" : dayText}</Typography>
									</Box>

									<Box
										sx={{
											display: "flex",
											gap: "8px",
											alignItems: "center",
											flexWrap: "wrap",
											flexGrow: 1,
										}}
									>
										{daysMap.intervals.map((d, k) => (
											<Fragment key={d.id}>
												<Badge
													role="button"
													sx={{
														cursor: "pointer",
														backgroundColor: badgeActive,
														padding: "6px 16px",
														borderRadius: "100px",
													}}
													onClick={(event: { currentTarget: HTMLElement | HTMLAnchorElement }) =>
														handleOpenInputs(day, event.currentTarget, k)
													}
													aria-haspopup="true"
													onMouseEnter={event =>
														popoversState.setAnchorElDetails({
															anchorEl: event.currentTarget,
															openedPopoverId: d.id,
														})
													}
													onMouseLeave={() =>
														popoversState.setAnchorElDetails({ anchorEl: null, openedPopoverId: undefined })
													}
												>
													{serializeTimeString(d.from)} - {serializeTimeString(d.to)}
												</Badge>

												{d.details && anchorElDetails.anchorEl && <PopoverDetails details={d.details} id={d.id} />}
											</Fragment>
										))}

										{daysMap.intervals.length < Number(props.intervalsAtDayLimit) && !props.previewMode && (
											<Link
												sx={{ cursor: "pointer" }}
												onClick={event => {
													handleOpenInputs(day, event.currentTarget);
												}}
											>
												<Typography variant="inherit">Добавить интервал</Typography>
											</Link>
										)}
									</Box>
								</Box>
							))}
						</Box>
					</Box>

					<ButtonsGroup previewMode={props.previewMode} />
				</div>
			</Paper>
		</>
	);
};
