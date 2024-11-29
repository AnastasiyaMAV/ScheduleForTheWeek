import { rulesManipulations, rulesValidation } from "@/const/schedule";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useStore } from "@nanostores/react";

import { MODALS, modalsActions, modalsStore } from "@/stores/modals";

export type TInstructionsModalProps = {
	open: boolean;
	selectedValue: string;
	onClose: (value: string) => void;
};

export const InstructionsModal = () => {
	const { openedModal } = useStore(modalsStore);

	return (
		<Dialog onClose={modalsActions.hideModal} open={openedModal === MODALS.INSTRUCTIONS}>
			<DialogTitle>Как пользоваться расписанием?</DialogTitle>

			<Typography variant="h6" sx={{ textAlign: "center" }}>
				Валидация полей
			</Typography>
			<List sx={{ pt: 0 }}>
				{rulesValidation.map((element, key) => (
					<ListItem key={element.description}>
						<ListItemText>{key + 1 + ") " + element.description}</ListItemText>
					</ListItem>
				))}
			</List>

			<Typography variant="h6" sx={{ textAlign: "center" }}>
				Манипуляции с интервалами
			</Typography>
			<List sx={{ pt: 0 }}>
				{rulesManipulations.map(element => (
					<ListItem key={element.description}>
						<ListItemText>
							<Typography variant="overline">{element.value}</Typography>
							<Typography variant="inherit">{element.description}</Typography>
						</ListItemText>
					</ListItem>
				))}
			</List>
		</Dialog>
	);
};
