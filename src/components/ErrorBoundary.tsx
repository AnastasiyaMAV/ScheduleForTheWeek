import ErrorIcon from "@mui/icons-material/Error";
import { Paper, Typography } from "@mui/material";
import { Icon } from "@mui/material";

export const ErrorBoundary = () => {
	return (
		<Paper elevation={3} sx={{ m: "24px", width: "350px", padding: "24px", display: "flex", gap: "24px" }}>
			<Icon color="error">
				<ErrorIcon />
			</Icon>
			<Typography variant="h5">Возникла ошибка</Typography>
		</Paper>
	);
};
