declare namespace NodeJS {
  interface ProcessEnv {
    JWT_SECRET: string;
    NODE_ENV?: "development" | "production" | "test";
    PORT?: string;
    MONGO_URI?: string;
    [key: string]: string | undefined;
  }
}
