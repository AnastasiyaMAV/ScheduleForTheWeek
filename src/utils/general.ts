import { TDay, TScheduleState } from "@/types/general";

export const parseTimeString = (timeString: string) => {
	const date = new Date();
	const [h, m] = timeString.split(":").map(v => +v);

	date.setHours(h);
	date.setMinutes(m);

	return { h, m, date };
};

export const addLeadZero = (n: number) => n.toString().padStart(2, "0");

export const serializeTimeString = (v: { hours: number; minutes: number }) => {
	return `${addLeadZero(v.hours)}:${addLeadZero(v.minutes)}`;
};

export const defaultState: TScheduleState = {
	daysMap: { [TDay.MONDAY]: { intervals: [] } },
	isAllDaysMode: false,
};

export const downloadFromBlob = (blob: Blob) => {
	const href = URL.createObjectURL(blob);
	const extension = blob.type.split("/").pop();

	return {
		extension,
		objectUrl: href,
		download: (fileName: string, extension?: string) => {
			const anchorElement = Object.assign(document.createElement("a"), {
				href,
				style: "display: none",
				download: extension ? `${fileName}.${extension}` : fileName,
			});
			document.body.appendChild(anchorElement);
			anchorElement.click();
			URL.revokeObjectURL(href);
			anchorElement.remove();
		},
	};
};
