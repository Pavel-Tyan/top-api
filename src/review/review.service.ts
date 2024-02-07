import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReviewModel, ReviewModelDocument } from './review.model';
import { Model, Types } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
    constructor(
        @InjectModel(ReviewModel.name) private reviewModel: Model<ReviewModelDocument>,
    ) {}

    async create(dto: CreateReviewDto): Promise<ReviewModel> {
        const newReview = new this.reviewModel(dto);
        return newReview.save();
    }

    async delete(id: string): Promise<ReviewModel> | null {
        return this.reviewModel.findByIdAndDelete(id).exec();
    }

    async findByProductId(productId: string): Promise<ReviewModel[]> {
        return this.reviewModel.find({ productId: new Types.ObjectId(productId) }).exec();
    }

    async deleteByProductId(productId: string) {
        return this.reviewModel
            .deleteMany({ productId: new Types.ObjectId(productId) })
            .exec();
    }
}
