import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReviewModelDocument = HydratedDocument<ReviewModel>;

@Schema()
export class ReviewModel {
    @Prop()
    name: string;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    rating: number;

    @Prop()
    createdAt: Date;
}

export const ReviewModelSchema = SchemaFactory.createForClass(ReviewModel);
