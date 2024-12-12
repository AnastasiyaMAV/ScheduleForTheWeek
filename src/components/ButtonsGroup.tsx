import { TButtonsGroupProps } from "@/types/general";
import { Box, Button } from "@mui/material";
import { useStore } from "@nanostores/react";

import { scheduleState } from "@/stores/schedule";

export const ButtonsGroup = ({ previewMode }: TButtonsGroupProps) => {
	const { isSaveData } = useStore(scheduleState.$store);

	return (
		<>
			{previewMode ? (
				<Box sx={{ display: "flex", gap: "12px", justifyContent: "end" }}>
					<Button
						sx={{ width: "100px", marginTop: "24px", alignSelf: "end" }}
						variant="contained"
						onClick={() => scheduleState.setIsSaveData(!isSaveData)}
					>
						Изменить
					</Button>
					<Button
						sx={{ width: "100px", marginTop: "24px", alignSelf: "end" }}
						variant="contained"
						onClick={() => scheduleState.exportData()}
					>
						Экспорт
					</Button>
				</Box>
			) : (
				<Box sx={{ display: "flex", justifyContent: "end" }}>
					<Button
						sx={{ width: "100px", marginTop: "24px" }}
						variant="contained"
						onClick={() => scheduleState.setIsSaveData(!isSaveData)}
					>
						Сохранить
					</Button>
				</Box>
			)}
		</>
	);
};
