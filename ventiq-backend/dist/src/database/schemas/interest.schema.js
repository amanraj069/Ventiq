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
exports.InterestSchema = exports.Interest = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const uuid_1 = require("uuid");
let Interest = class Interest extends mongoose_2.Document {
    interestId;
    ideaId;
    investorId;
    status;
    message;
};
exports.Interest = Interest;
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: uuid_1.v4, unique: true }),
    __metadata("design:type", String)
], Interest.prototype, "interestId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Interest.prototype, "ideaId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Interest.prototype, "investorId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['pending', 'accepted', 'rejected'], default: 'pending' }),
    __metadata("design:type", String)
], Interest.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Interest.prototype, "message", void 0);
exports.Interest = Interest = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Interest);
exports.InterestSchema = mongoose_1.SchemaFactory.createForClass(Interest);
exports.InterestSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    },
});
//# sourceMappingURL=interest.schema.js.map