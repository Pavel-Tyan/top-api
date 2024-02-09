import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserModelDocument = HydratedDocument<UserModel>;

@Schema()
export class UserModel {
    @Prop({ unique: true })
    email: string;

    @Prop()
    passwordHash: string;
}

export const UserModelSchema = SchemaFactory.createForClass(UserModel);
