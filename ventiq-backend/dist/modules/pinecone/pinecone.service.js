"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PineconeService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PineconeService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const pinecone_1 = require("@pinecone-database/pinecone");
const google_genai_1 = require("@langchain/google-genai");
let PineconeService = PineconeService_1 = class PineconeService {
    configService;
    logger = new common_1.Logger(PineconeService_1.name);
    pinecone = null;
    indexName;
    embeddingsModel = null;
    constructor(configService) {
        this.configService = configService;
        this.indexName = this.configService.get('pinecone.index', 'ventiq-ideas');
    }
    async onModuleInit() {
        const pineconeApiKey = this.configService.get('pinecone.apiKey');
        const geminiApiKey = this.configService.get('gemini.apiKey');
        if (!pineconeApiKey || pineconeApiKey === 'your-pinecone-api-key') {
            this.logger.warn('Pinecone API key not configured. Similarity search will be disabled.');
            return;
        }
        try {
            this.pinecone = new pinecone_1.Pinecone({ apiKey: pineconeApiKey });
            this.logger.log(`Initialized Pinecone client for index: ${this.indexName}`);
        }
        catch (error) {
            this.logger.error('Failed to initialize Pinecone client', error);
        }
        if (geminiApiKey) {
            this.embeddingsModel = new google_genai_1.GoogleGenerativeAIEmbeddings({
                apiKey: geminiApiKey,
                modelName: 'text-embedding-004',
            });
        }
        else {
            this.logger.warn('Gemini API key not configured for embeddings.');
        }
    }
    isReady() {
        return this.pinecone !== null && this.embeddingsModel !== null;
    }
    async embedText(text) {
        if (!this.embeddingsModel)
            throw new Error('Embeddings model not initialized');
        return this.embeddingsModel.embedQuery(text);
    }
    async upsertIdea(ideaId, text, metadata = {}) {
        if (!this.isReady()) {
            this.logger.warn('Pinecone or Embeddings not initialized. Skipping upsert.');
            return;
        }
        try {
            const vector = await this.embedText(text);
            const index = this.pinecone.index(this.indexName);
            await index.upsert({
                records: [
                    {
                        id: ideaId,
                        values: vector,
                        metadata,
                    },
                ]
            });
            this.logger.log(`Successfully upserted idea to Pinecone: ${ideaId}`);
        }
        catch (error) {
            this.logger.error(`Failed to upsert idea ${ideaId} to Pinecone`, error);
        }
    }
    async findSimilar(text, topK = 3) {
        if (!this.isReady()) {
            this.logger.warn('Pinecone or Embeddings not initialized. Returning empty similarity results.');
            return [];
        }
        try {
            const vector = await this.embedText(text);
            const index = this.pinecone.index(this.indexName);
            const response = await index.query({
                vector,
                topK,
                includeMetadata: true,
            });
            return response.matches.map((match) => ({
                ideaId: match.id,
                score: match.score,
                metadata: match.metadata,
            }));
        }
        catch (error) {
            this.logger.error('Failed to query Pinecone for similarity', error);
            return [];
        }
    }
};
exports.PineconeService = PineconeService;
exports.PineconeService = PineconeService = PineconeService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PineconeService);
//# sourceMappingURL=pinecone.service.js.map