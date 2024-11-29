import { map } from "nanostores";

export enum MODALS {
	NOTHING,
	INSTRUCTIONS,
}

type TModalsStore = {
	openedModal: MODALS;
};

export const modalsStore = map<TModalsStore>();

const hideModal = () => {
	modalsStore.setKey("openedModal", MODALS.NOTHING);
};

const openModal = (modal: MODALS) => {
	modalsStore.setKey("openedModal", modal);
};

export const modalsActions = { openModal, hideModal };
