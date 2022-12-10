declare global {
	namespace NodeJS {
		interface ProcessEnv {
			API_DOC: string;
			API_HOST: string;
		}
	}
}

export {};
