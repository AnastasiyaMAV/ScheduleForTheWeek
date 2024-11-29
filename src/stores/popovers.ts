import { TAnchorElDetails } from "@/types/general";
import { deepMap } from "nanostores";

export type TPopoversStore = {
	isOpenInterval: boolean;
	anchorElInterval: HTMLAnchorElement | HTMLElement | null;
	anchorElDetails: TAnchorElDetails;
};

const initialState = {
	isOpenInterval: false,
	anchorElInterval: null,
	anchorElDetails: {
		anchorEl: null,
		openedPopoverId: undefined,
	},
};

function createPopovers() {
	const $store = deepMap<TPopoversStore>(initialState);

	const setIsOpenInterval = (value: boolean) => {
		$store.setKey("isOpenInterval", value);
	};

	const setAnchorElInterval = (value: HTMLAnchorElement | HTMLElement | null) => {
		$store.setKey("anchorElInterval", value);
	};

	const setAnchorElDetails = (value: TAnchorElDetails) => {
		$store.setKey("anchorElDetails", value);
	};

	return {
		$store,
		setIsOpenInterval,
		setAnchorElDetails,
		setAnchorElInterval,
	};
}

export const popoversState = createPopovers();
