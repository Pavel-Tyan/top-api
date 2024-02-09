import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserModelSchema } from './user.model';
import { AuthService } from './auth.service';

@Module({
    controllers: [AuthController],
    imports: [
        MongooseModule.forFeature([{ name: UserModel.name, schema: UserModelSchema }]),
    ],
    providers: [AuthService],
})
export class AuthModule {}
