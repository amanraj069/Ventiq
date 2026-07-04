import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pinecone } from '@pinecone-database/pinecone';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';

@Injectable()
export class PineconeService implements OnModuleInit {
  private readonly logger = new Logger(PineconeService.name);
  private pinecone: Pinecone | null = null;
  private indexName: string;
  private embeddingsModel: GoogleGenerativeAIEmbeddings | null = null;

  constructor(private readonly configService: ConfigService) {
    this.indexName = this.configService.get<string>('pinecone.index', 'ventiq-ideas');
  }

  async onModuleInit() {
    const pineconeApiKey = this.configService.get<string>('pinecone.apiKey');
    const geminiApiKey = this.configService.get<string>('gemini.apiKey');

    if (!pineconeApiKey || pineconeApiKey === 'your-pinecone-api-key') {
      this.logger.warn('Pinecone API key not configured. Similarity search will be disabled.');
      return;
    }

    try {
      this.pinecone = new Pinecone({ apiKey: pineconeApiKey });
      this.logger.log(`Initialized Pinecone client for index: ${this.indexName}`);
    } catch (error) {
      this.logger.error('Failed to initialize Pinecone client', error);
    }

    if (geminiApiKey) {
      this.embeddingsModel = new GoogleGenerativeAIEmbeddings({
        apiKey: geminiApiKey,
        modelName: 'text-embedding-004',
      });
    } else {
      this.logger.warn('Gemini API key not configured for embeddings.');
    }
  }

  private isReady(): boolean {
    return this.pinecone !== null && this.embeddingsModel !== null;
  }

  /**
   * Generates a 768-d embedding for the given text
   */
  async embedText(text: string): Promise<number[]> {
    if (!this.embeddingsModel) throw new Error('Embeddings model not initialized');
    return this.embeddingsModel.embedQuery(text);
  }

  /**
   * Upserts an idea into the Pinecone index.
   */
  async upsertIdea(ideaId: string, text: string, metadata: any = {}) {
    if (!this.isReady()) {
      this.logger.warn('Pinecone or Embeddings not initialized. Skipping upsert.');
      return;
    }

    try {
      const vector = await this.embedText(text);
      const index = this.pinecone!.index(this.indexName);
      
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
    } catch (error) {
      this.logger.error(`Failed to upsert idea ${ideaId} to Pinecone`, error);
    }
  }

  /**
   * Queries Pinecone for similar ideas based on text.
   */
  async findSimilar(text: string, topK: number = 3) {
    if (!this.isReady()) {
      this.logger.warn('Pinecone or Embeddings not initialized. Returning empty similarity results.');
      return [];
    }

    try {
      const vector = await this.embedText(text);
      const index = this.pinecone!.index(this.indexName);

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
    } catch (error) {
      this.logger.error('Failed to query Pinecone for similarity', error);
      return [];
    }
  }
}
