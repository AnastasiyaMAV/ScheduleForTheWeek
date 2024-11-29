import { Box } from "@mui/material";
import styled from "styled-components";

export const WrapperStyled = styled(Box)<{ isActive?: boolean }>`
	height: 100vh;
	display: grid;
	grid-template-columns: repeat(9, 1fr);
	grid-auto-rows: minmax(100px, auto);
	grid-template-areas:
		"hd   hd   hd   hd   hd   hd   hd   hd   hd"
		"main main main main main main main main main"
		"ft   ft   ft   ft   ft   ft   ft   ft   ft";
`;

export const HeaderStyled = styled(Box)<{ isActive?: boolean }>`
	height: 10vh;
	grid-area: hd;
	padding-top: 24px;
	padding-left: 24px;
	padding-right: 24px;
`;

export const ContentStyled = styled(Box)<{ isActive?: boolean }>`
	height: 80vh;
	grid-area: main;
	padding-left: 24px;
	padding-right: 24px;
`;

export const FooterStyled = styled(Box)<{ isActive?: boolean }>`
	height: 10vh;
	grid-area: ft;
	padding-left: 24px;
	padding-right: 24px;
`;
