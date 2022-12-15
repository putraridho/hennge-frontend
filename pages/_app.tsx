import axios from "axios";
import type { AppProps } from "next/app";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import getConfig from "next/config";

import { serviceOptions } from "@services";

import "../styles/global.css";

const {
	publicRuntimeConfig: { apiHost },
} = getConfig();

serviceOptions.axios = axios.create({
	baseURL: apiHost,
	timeout: 3000,
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<Component {...pageProps} />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
