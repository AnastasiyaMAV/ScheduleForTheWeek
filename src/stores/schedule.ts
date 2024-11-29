import { dayToTextMap, scheduleObj } from "@/const/schedule";
import { TDay, TInputValues, TScheduleState } from "@/types/general";
import { downloadFromBlob } from "@/utils/general";
// import { format } from "date-fns";
import { deepMap } from "nanostores";

export type TScheduleStore = {
	data: TScheduleState | undefined;
	inputValues: TInputValues;
	editedIndex: number | undefined;
	isSaveData: boolean;
};

const initialState = {
	data: scheduleObj,
	inputValues: { first: "", second: "", error: "", text: "", id: undefined },
	editedIndex: undefined,
	isSaveData: false,
};

function createSchedule() {
	const $store = deepMap<TScheduleStore>(initialState);

	const setValue = (value: TScheduleState) => {
		$store.setKey("data", value);
	};

	const setInputValues = (value: TInputValues) => {
		$store.setKey("inputValues", value);
	};

	const setEditedIndex = (value: number | undefined) => {
		$store.setKey("editedIndex", value);
	};

	const setIsSaveData = (value: boolean) => {
		$store.setKey("isSaveData", value);
	};

	const exportData = async () => {
		const { data } = $store.get();
		const dataFromFile =
			data &&
			Object.entries(data?.daysMap).map(element => {
				const day = dayToTextMap[element[0] as TDay];
				const timeAndDetails = Object.values(
					element[1].intervals.map((el, index) => {
						const count = index >= 1 ? " " : "";
						const strDetails = el?.details ? " - " + el?.details : " - Нет деталий";
						const strTime =
							String(el.from.hours).padStart(2, "0") +
							":" +
							String(el.from.minutes).padStart(2, "0") +
							"-" +
							String(el.to.hours).padStart(2, "0") +
							":" +
							String(el.to.minutes).padStart(2, "0");

						return count + strTime + strDetails;
					})
				);
				const result = day + " — " + timeAndDetails;
				return result;
			});

		const txt = `\uFEFF${dataFromFile?.map(el => el).join("\n")}`;
		const blob = new Blob([txt], { type: "text/txt;charset=UTF-8" });
		const { download } = await downloadFromBlob(blob);
		download(`ScheduleForTheWeek${new Date().toLocaleString().slice(0, 10)}.txt`);
	};

	return {
		$store,
		setValue,
		exportData,
		setIsSaveData,
		setEditedIndex,
		setInputValues,
	};
}

export const scheduleState = createSchedule();
