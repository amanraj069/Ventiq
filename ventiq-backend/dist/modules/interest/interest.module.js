"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterestModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const interest_service_1 = require("./interest.service");
const interest_controller_1 = require("./interest.controller");
const interest_schema_1 = require("../../database/schemas/interest.schema");
const idea_schema_1 = require("../../database/schemas/idea.schema");
const user_schema_1 = require("../../database/schemas/user.schema");
let InterestModule = class InterestModule {
};
exports.InterestModule = InterestModule;
exports.InterestModule = InterestModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: interest_schema_1.Interest.name, schema: interest_schema_1.InterestSchema },
                { name: idea_schema_1.Idea.name, schema: idea_schema_1.IdeaSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
            ]),
        ],
        controllers: [interest_controller_1.InterestController],
        providers: [interest_service_1.InterestService],
        exports: [interest_service_1.InterestService],
    })
], InterestModule);
//# sourceMappingURL=interest.module.js.map