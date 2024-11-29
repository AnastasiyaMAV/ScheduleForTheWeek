import { createBrowserRouter } from "react-router-dom";

import { Starting } from "@/pages/Starting";

import { ErrorBoundary } from "@/components/ErrorBoundary";

export const routes = createBrowserRouter([
	{
		path: "/",
		element: <Starting />,
		errorElement: <ErrorBoundary />,
	},
]);
