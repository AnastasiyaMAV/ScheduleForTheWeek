import { days } from "@/const/schedule";
import { TitleButtonsStyled } from "@/styles/schedule";
import { TDay, TTitleButtons } from "@/types/general";
import { Button, Divider } from "@mui/material";

export const TitleButtons = ({ schedule, onChange, defaultAllDaysInterval, defaultOneDayInterval }: TTitleButtons) => {
	const handleSetAllDaysMode = () => {
		if (schedule.isAllDaysMode) return;
		onChange?.({
			isAllDaysMode: true,
			daysMap: Object.fromEntries(
				days.map(v => [v.value, { intervals: defaultAllDaysInterval ? [defaultAllDaysInterval] : [] }])
			),
		});
	};

	const handleToggleDay = (day: TDay) => {
		const newState = structuredClone(schedule);

		const settedDays = Object.keys(newState.daysMap);
		if (settedDays.length === 1 && settedDays[0] === day) return;

		newState.isAllDaysMode
			? (newState.daysMap = { [day]: { intervals: defaultOneDayInterval ? [defaultOneDayInterval] : [] } })
			: newState.daysMap?.[day]
			? delete newState.daysMap[day]
			: (newState.daysMap[day] = { intervals: defaultOneDayInterval ? [defaultOneDayInterval] : [] });

		newState.isAllDaysMode = false;

		onChange?.(newState);
	};
	return (
		<TitleButtonsStyled sx={{ display: "flex", gap: "10px" }}>
			<Button onClick={handleSetAllDaysMode} data-is-active={!!schedule.isAllDaysMode}>
				Все дни
			</Button>
			<Divider orientation="vertical" variant="middle" flexItem />
			{days.map(d => (
				<Button
					key={d.value}
					size="small"
					onClick={() => handleToggleDay(d.value)}
					data-is-active={!!schedule.daysMap?.[d.value] && !schedule.isAllDaysMode}
				>
					{d.title}
				</Button>
			))}
		</TitleButtonsStyled>
	);
};
