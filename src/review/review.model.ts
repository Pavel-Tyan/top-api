import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type ReviewModelDocument = HydratedDocument<ReviewModel>;

@Schema({ timestamps: true, _id: true })
export class ReviewModel {
    @Prop()
    name: string;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    rating: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Products' })
    productId: Types.ObjectId;
}

export const ReviewModelSchema = SchemaFactory.createForClass(ReviewModel);
