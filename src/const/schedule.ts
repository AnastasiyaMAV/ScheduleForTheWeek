import { TDay } from "@/types/general";

export const dayToTextMap = {
	[TDay.MONDAY]: "Понедельник",
	[TDay.TUESDAY]: "Вторник",
	[TDay.WEDNESDAY]: "Среда",
	[TDay.THURSDAY]: "Четверг",
	[TDay.FRIDAY]: "Пятница",
	[TDay.SATURDAY]: "Суббота",
	[TDay.SUNDAY]: "Воскресенье",
};

export const dayToWeightMap = {
	[TDay.MONDAY]: 1,
	[TDay.TUESDAY]: 3,
	[TDay.WEDNESDAY]: 3,
	[TDay.THURSDAY]: 4,
	[TDay.FRIDAY]: 5,
	[TDay.SATURDAY]: 6,
	[TDay.SUNDAY]: 6,
};

export const days = [
	{
		title: "Пн",
		value: TDay.MONDAY,
	},
	{
		title: "Вт",
		value: TDay.TUESDAY,
	},
	{
		title: "Ср",
		value: TDay.WEDNESDAY,
	},
	{
		title: "Чт",
		value: TDay.THURSDAY,
	},
	{
		title: "Пт",
		value: TDay.FRIDAY,
	},
	{
		title: "Сб",
		value: TDay.SATURDAY,
	},
	{
		title: "Вс",
		value: TDay.SUNDAY,
	},
];

export const rulesValidation = [
	{ description: "Каждый из дней может иметь минимум 1 интервал. Возможно добавить до 10 интервалов." },
	{
		description:
			"Начало интервала не должно совпадать с окончанием (например, 11:00 - 11:00). Иначе ошибка: «Укажите интервал с не нулевой длительностью». При этом интервал нельзя сохранить.",
	},
	{
		description:
			"Новые сутки начинаются с 00:00. Интервал должен быть в рамках 1 суток. Например, если введено значение 00:00, ошибка: «Интервал должен завершиться до 23:59». При этом интервал нельзя сохранить.",
	},
	{
		description:
			"Интервалы не должны пересекаться в рамках 1 дня. Если есть пересечение на 1 минуту и более с уже добавленным интервалом, ошибка: «Интервалы не должны пересекаться». При этом интервал нельзя сохранить.",
	},
	{
		description:
			"Например, если есть интервал 11:00 - 15:00, нельзя добавить интервал 12:00 - 15:00 или 14:59 - 16:00.",
	},
];

export const rulesManipulations = [
	{
		value: "Добавление интервала",
		description:
			"У каждого добавленного дня всегда есть 1 интервал. Возможно добавить до 10 интервалов. По клику на «Добавить интервал» открывается модальное окно с вводом часов начала и завершения. Если валидация успешно пройдена, то кнопка «Добавить» в модальном окне становится активной и по нажатию на неё появляется новый интервал времени в расписании. После добавления 4-го интервала ссылка «Добавить интервал» исчезает.",
	},
	{
		value: "Удаление интервала",
		description:
			"Для удаления интервала, нужно щелкнуть по бейджу с требуемым интервалом ЛКМ, откроется модальное окно с данными интервала и активной кнопкой «Удалить интервал», по нажатию на эту кнопку - интервал удаляется.",
	},
	{
		value: "Редактирование интервала",
		description:
			"Для редактирования интервала, нужно щелкнуть по бейджу с требуемым интервалом ЛКМ, откроется модальное окно с данными интервала, изменить интервал и нажать кнопку «Enter» на клавиатуре",
	},
];

export const defaultInterval = {
	from: { hours: 9, minutes: 0, seconds: 0, nanos: 0 },
	to: { hours: 18, minutes: 0, seconds: 0, nanos: 0 },
};

export const scheduleObj = {
	daysMap: {
		mon: {
			intervals: [
				{
					from: {
						hours: 9,
						minutes: 0,
						seconds: 0,
						nanos: 0,
					},
					to: {
						hours: 18,
						minutes: 0,
						seconds: 0,
						nanos: 0,
					},

					id: Date.now() + 1,
				},
			],
		},
		tue: {
			intervals: [
				{
					from: {
						hours: 9,
						minutes: 0,
						seconds: 0,
						nanos: 0,
					},
					to: {
						hours: 18,
						minutes: 0,
						seconds: 0,
						nanos: 0,
					},
					id: Date.now() + 2,
				},
			],
		},
		wed: {
			intervals: [
				{
					from: {
						hours: 9,
						minutes: 0,
						seconds: 0,
						nanos: 0,
					},
					to: {
						hours: 18,
						minutes: 0,
						seconds: 0,
						nanos: 0,
					},

					id: Date.now() + 3,
				},
			],
		},
		thu: {
			intervals: [
				{
					from: {
						hours: 9,
						minutes: 0,
						seconds: 0,
						nanos: 0,
					},
					to: {
						hours: 18,
						minutes: 0,
						seconds: 0,
						nanos: 0,
					},
					id: Date.now() + 4,
				},
			],
		},
		fri: {
			intervals: [
				{
					from: {
						hours: 9,
						minutes: 0,
						seconds: 0,
						nanos: 0,
					},
					to: {
						hours: 18,
						minutes: 0,
						seconds: 0,
						nanos: 0,
					},

					id: Date.now() + 5,
				},
			],
		},
	},

	isAllDaysMode: false,
};
