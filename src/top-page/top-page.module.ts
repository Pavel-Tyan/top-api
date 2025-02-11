import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import {
    HhData,
    HhDataSchema,
    TopPageAdvantage,
    TopPageAdvantageSchema,
    TopPageModel,
    TopPageModelSchema,
} from './top-page.model';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPageService } from './top-page.service';

@Module({
    controllers: [TopPageController],
    imports: [
        MongooseModule.forFeature([
            { name: TopPageModel.name, schema: TopPageModelSchema },
            { name: HhData.name, schema: HhDataSchema },
            { name: TopPageAdvantage.name, schema: TopPageAdvantageSchema },
        ]),
    ],
    providers: [TopPageService],
})
export class TopPageModule {}
