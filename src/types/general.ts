export type TInterval = {
	from: { hours: number; nanos: number; minutes: number; seconds: number };
	to: { hours: number; nanos: number; minutes: number; seconds: number };
	details?: string;
	id?: number;
};

export type TScheduleDay = { intervals: TInterval[] };

export type TScheduleState = {
	daysMap: Partial<Record<TDay, TScheduleDay>>;
	isAllDaysMode: boolean;
};

export type TScheduleProps = {
	value?: TScheduleState;
	onChange?: (value: TScheduleState) => void;
	previewMode?: boolean;
	intervalsAtDayLimit?: number;
	defaultAllDaysInterval?: TInterval;
	defaultOneDayInterval?: TInterval;
};

export enum TDay {
	MONDAY = "mon",
	SUNDAY = "sun",
	FRIDAY = "fri",
	TUESDAY = "tue",
	SATURDAY = "sat",
	THURSDAY = "thu",
	WEDNESDAY = "wed",
}

export type TInputValues = {
	first: string;
	second: string;
	error: string;
	text?: string;
	id?: number;
};

export type TAnchorElDetails = {
	openedPopoverId: number | undefined;
	anchorEl: HTMLElement | null;
};

export type TTitleButtons = {
	schedule: TScheduleState;
	onChange: ((value: TScheduleState) => void) | undefined;
	defaultAllDaysInterval: TInterval | undefined;
	defaultOneDayInterval: TInterval | undefined;
};
