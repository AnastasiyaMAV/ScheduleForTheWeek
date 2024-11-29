import { Box } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import styled from "styled-components";

export const tertiaryActive = blue[500];
export const badgeActive = blue[300];
export const primary = grey[900];
export const inverted = grey[50];

export const TitleButtonsStyled = styled(Box)<{ isActive?: boolean }>`
	& > button {
		color: ${primary};
		height: 32px;
		padding: 6px 16px;
		border-radius: 100px;
		background-color: ${tertiaryActive};

		&[data-is-active="true"] {
			color: ${inverted};
			background-color: ${primary};
		}

		&:hover {
			opacity: 0.8;
			background-color: ${tertiaryActive};
		}

		&[data-is-active="true"]:hover {
			background-color: ${primary};
		}
		font-size: 14px;
		font-weight: 500;
	}
`;
