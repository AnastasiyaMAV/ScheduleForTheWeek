import { Box, InputLabel, MenuItem, Select } from "@mui/material";
import { useStore } from "@nanostores/react";

import { scheduleState } from "@/stores/schedule";

export const MaximumNumberOfIntervals = () => {
	const { isSaveData, intervalsAtDayLimit } = useStore(scheduleState.$store);

	return (
		<>
			{!isSaveData && (
				<Box sx={{ display: "flex", gap: "8px", alignItems: "center", justifyContent: "end", marginBottom: "24px" }}>
					<InputLabel>Укажите максимальное количество интервалов</InputLabel>
					<Select
						value={intervalsAtDayLimit}
						onChange={scheduleState.setIntervalsAtDayLimit}
						sx={{ width: "100px", height: "30px" }}
					>
						{Array.from({ length: 10 }, (_, i) => (
							<MenuItem key={i + 1} value={i + 1}>
								{i + 1}
							</MenuItem>
						))}
					</Select>
				</Box>
			)}
		</>
	);
};
