import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductCharacteristic, ProductCharacteristicSchema, ProductModel, ProductModelSchema } from './product.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    controllers: [ProductController],
    imports: [
        MongooseModule.forFeature([
            { name: ProductModel.name, schema: ProductModelSchema },
            { name: ProductCharacteristic.name, schema: ProductCharacteristicSchema },
        ]),
    ],
})
export class ProductModule {}
