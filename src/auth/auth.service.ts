import { Injectable } from '@nestjs/common';
import { UserModel, UserModelDocument } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthDto } from './dto/auth.dto';
import { genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(UserModel.name) private readonly userModel: Model<UserModelDocument>,
    ) {}

    async createUser(dto: AuthDto): Promise<UserModel> {
        const salt = genSaltSync(10);
        const newUser = new this.userModel({
            email: dto.login,
            passwordHash: hashSync(dto.password, salt),
        });

        return newUser.save();
    }

    async findUser(email: string): Promise<UserModel> {
        return this.userModel.findOne({ email }).exec();
    }
}
