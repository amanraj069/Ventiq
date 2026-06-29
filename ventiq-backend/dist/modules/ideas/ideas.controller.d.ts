import { IdeasService } from './ideas.service';
import { CreateIdeaDto } from './dto/create-idea.dto';
export declare class IdeasController {
    private readonly ideasService;
    constructor(ideasService: IdeasService);
    create(userId: string, createIdeaDto: CreateIdeaDto): Promise<import("../../database/schemas/idea.schema").Idea>;
    findAll(userId: string): Promise<import("../../database/schemas/idea.schema").Idea[]>;
    findOne(userId: string, ideaId: string): Promise<any>;
}
