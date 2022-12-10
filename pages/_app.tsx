import axios from "axios";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

import { serviceOptions } from "@services";
import getConfig from "next/config";

const {
	publicRuntimeConfig: { apiHost },
} = getConfig();

serviceOptions.axios = axios.create({
	baseURL: apiHost,
	timeout: 3000,
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={new QueryClient()}>
			<Component {...pageProps} />
		</QueryClientProvider>
	);
}
