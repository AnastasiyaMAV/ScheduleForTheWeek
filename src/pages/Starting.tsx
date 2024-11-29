import { defaultInterval } from "@/const/schedule";
import { ContentStyled, FooterStyled, HeaderStyled, WrapperStyled } from "@/styles/general";
import TelegramIcon from "@mui/icons-material/Telegram";
import { Box, Button, Icon, Link, Typography } from "@mui/material";
import { useStore } from "@nanostores/react";

import { Schedule } from "@/components/Schedule";
import { InstructionsModal } from "@/components/modals/InstructionsModal";

import { MODALS, modalsActions } from "@/stores/modals";
import { scheduleState } from "@/stores/schedule";

export const Starting = () => {
	const { data, isSaveData } = useStore(scheduleState.$store);

	return (
		<>
			<WrapperStyled>
				<HeaderStyled>
					<Box sx={{ display: "flex", justifyContent: "space-between" }}>
						<Typography variant="h3" component="h2">
							Расписание на неделю
						</Typography>
						<Button variant="outlined" onClick={() => modalsActions.openModal(MODALS.INSTRUCTIONS)}>
							Инструкция
						</Button>
						<InstructionsModal />
					</Box>
				</HeaderStyled>
				<ContentStyled>
					<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
						{isSaveData ? (
							<Schedule previewMode value={data} />
						) : (
							<Schedule
								defaultOneDayInterval={defaultInterval}
								defaultAllDaysInterval={defaultInterval}
								value={data}
								onChange={scheduleState.setValue}
							/>
						)}
					</Box>
				</ContentStyled>
				<FooterStyled>
					<Box sx={{ display: "flex", justifyContent: "end" }}>
						<Typography variant="overline">Paзработала&nbsp;</Typography>
						<Link href="https://t.me/nastua_mav" underline="hover">
							<Typography variant="overline">nastua_mav</Typography>
						</Link>
						<Icon color="info">
							<TelegramIcon />
						</Icon>
					</Box>
				</FooterStyled>
			</WrapperStyled>
		</>
	);
};
