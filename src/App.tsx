import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";

import { routes } from "./const/routing";

export const App = () => {
	return (
		<>
			<CssBaseline />
			<RouterProvider router={routes} />
		</>
	);
};
