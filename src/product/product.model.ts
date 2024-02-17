import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MSchema } from 'mongoose';

export type ProductCharacteristicDocument = HydratedDocument<ProductCharacteristic>;
export type ProductModelDocument = HydratedDocument<ProductModel>;

@Schema()
export class ProductCharacteristic {
    @Prop()
    name: string;

    @Prop()
    value: string;
}

@Schema()
export class ProductModel {
    @Prop()
    image: string;

    @Prop()
    title: string;

    @Prop()
    price: number;

    @Prop()
    oldPrice?: number;

    @Prop()
    credit: number;

    @Prop()
    description: string;

    @Prop()
    advantages: string;

    @Prop()
    disadvantages: string;

    @Prop([String])
    categories: string[];

    @Prop([String])
    tags: string[];

    @Prop({ type: MSchema.Types.ObjectId, ref: ProductCharacteristic.name })
    characteristics: ProductCharacteristic[];
}

export const ProductCharacteristicSchema =
    SchemaFactory.createForClass(ProductCharacteristic);
export const ProductModelSchema = SchemaFactory.createForClass(ProductModel);
