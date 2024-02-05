import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MSchema } from 'mongoose';

export enum TopLevelCategory {
    Courses,
    Services,
    Books,
    Products,
}

export type HhDataDocument = HydratedDocument<HhData>;
export type TopPageAdvantageDocument = HydratedDocument<TopPageAdvantage>;
export type TopPageModelDocument = HydratedDocument<TopPageModel>;

@Schema()
export class HhData {
    @Prop()
    count: number;

    @Prop()
    juniorSalary: number;

    @Prop()
    middleSalary: number;

    @Prop()
    seniorSalary: number;
}

@Schema()
export class TopPageAdvantage {
    @Prop()
    title: string;

    @Prop()
    description: string;
}

@Schema()
export class TopPageModel {
    @Prop()
    firstLevelCategory: TopLevelCategory;

    @Prop()
    secondLevelCategory: string;

    @Prop()
    title: string;

    @Prop()
    category: string;

    @Prop({ type: MSchema.Types.ObjectId, ref: HhData.name })
    hh?: HhData;

    @Prop({ type: MSchema.Types.ObjectId, ref: TopPageAdvantage.name })
    advantages: TopPageAdvantage[];

    @Prop()
    seoText: string;

    @Prop()
    tagsTitle: string;

    @Prop([String])
    tags: string[];
}

export const HhDataSchema = SchemaFactory.createForClass(HhData);
export const TopPageAdvantageSchema = SchemaFactory.createForClass(TopPageAdvantage);
export const TopPageModelSchema = SchemaFactory.createForClass(TopPageModel);
