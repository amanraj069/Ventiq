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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdeaSchema = exports.Idea = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const uuid_1 = require("uuid");
let Idea = class Idea extends mongoose_2.Document {
    ideaId;
    founderId;
    title;
    description;
    deckUrl;
    status;
    websiteUrl;
    targetMarket;
    businessModel;
    competitors;
    traction;
    team;
    fundingAsk;
};
exports.Idea = Idea;
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: uuid_1.v4, unique: true }),
    __metadata("design:type", String)
], Idea.prototype, "ideaId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Idea.prototype, "founderId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Idea.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Idea.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Idea.prototype, "deckUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['draft', 'submitted', 'evaluated'], default: 'draft' }),
    __metadata("design:type", String)
], Idea.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Idea.prototype, "websiteUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Idea.prototype, "targetMarket", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Idea.prototype, "businessModel", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Idea.prototype, "competitors", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Idea.prototype, "traction", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Idea.prototype, "team", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Idea.prototype, "fundingAsk", void 0);
exports.Idea = Idea = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Idea);
exports.IdeaSchema = mongoose_1.SchemaFactory.createForClass(Idea);
exports.IdeaSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    },
});
//# sourceMappingURL=idea.schema.js.map