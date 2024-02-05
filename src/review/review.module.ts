import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewModel, ReviewModelSchema } from './review.model';

@Module({
    controllers: [ReviewController],
    imports: [MongooseModule.forFeature([{ name: ReviewModel.name, schema: ReviewModelSchema }])],
})
export class ReviewModule {}
