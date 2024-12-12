import { TPopoverDetailsProps } from "@/types/general";
import { Popover, Typography } from "@mui/material";
import { useStore } from "@nanostores/react";

import { popoversState } from "@/stores/popovers";

export const PopoverDetails = ({ details, id }: TPopoverDetailsProps) => {
	const { anchorElDetails } = useStore(popoversState.$store);

	return (
		<>
			<Popover
				sx={{ pointerEvents: "none" }}
				open={anchorElDetails.openedPopoverId === id}
				anchorEl={anchorElDetails.anchorEl}
				anchorOrigin={{
					vertical: "center",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "center",
					horizontal: "left",
				}}
			>
				<Typography sx={{ p: 1 }}>{details}</Typography>
			</Popover>
		</>
	);
};
