"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    port: parseInt(process.env.PORT || '3001', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    database: {
        url: process.env.DATABASE_URL || 'postgresql://ventiq:ventiq_dev_password@localhost:5432/ventiq',
    },
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'dev-jwt-secret-change-in-production',
        expiration: process.env.JWT_EXPIRATION || '15m',
        refreshExpiration: process.env.JWT_REFRESH_EXPIRATION || '7d',
    },
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID || '',
    },
    gemini: {
        apiKey: process.env.GEMINI_API_KEY || '',
    },
    groq: {
        apiKey: process.env.GROQ_API_KEY || '',
    },
    pinecone: {
        apiKey: process.env.PINECONE_API_KEY || '',
        index: process.env.PINECONE_INDEX || 'ventiq-ideas',
    },
    frontend: {
        url: process.env.FRONTEND_URL || 'http://localhost:3000',
    },
});
//# sourceMappingURL=configuration.js.map