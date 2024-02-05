import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthModelDocument = HydratedDocument<AuthModel>;

@Schema()
export class AuthModel {
    @Prop()
    email: string;

    @Prop()
    passwordHash: string;
}

export const AuthModelSchema = SchemaFactory.createForClass(AuthModel);
