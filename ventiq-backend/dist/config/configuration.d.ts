declare const _default: () => {
    port: number;
    nodeEnv: string;
    database: {
        url: string;
    };
    redis: {
        host: string;
        port: number;
    };
    jwt: {
        secret: string;
        expiration: string;
        refreshExpiration: string;
    };
    google: {
        clientId: string;
    };
    gemini: {
        apiKey: string;
    };
    groq: {
        apiKey: string;
    };
    pinecone: {
        apiKey: string;
        index: string;
    };
    frontend: {
        url: string;
    };
};
export default _default;
