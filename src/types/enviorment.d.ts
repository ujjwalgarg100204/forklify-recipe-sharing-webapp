export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT: number;
			COOKIE_SECRET: string;
			MONGO_USERNAME: string;
			MONGO_PASSWORD: string;
			MONGO_URL: string;
			GOOGLE_CLIENT_ID: string;
			GOOGLE_CLIENT_SECRET: string;
			GITHUB_CLIENT_ID: string;
			GITHUB_CLIENT_SECRET: string;
			LINKEDIN_CLIENT_ID: string;
			LINKEDIN_CLIENT_SECRET: string;
		}
	}
}
