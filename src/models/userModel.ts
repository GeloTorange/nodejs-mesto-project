import {
  Schema, model, Model, Document,
} from 'mongoose';
import { isEmail } from 'validator';
import bcrypt from 'bcryptjs';
import AuthError from '../errors/AuthError';

interface IUser {
  email: string,
  password: string,
  name: string,
  about: string,
  avatar: string,
}

interface UserModel extends Model<IUser> {
  authUserByCredentials: (email: string, password: string) => Promise<Document<unknown, any, IUser>>
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: [true, 'Поле "email" должно быть заполнено'],
    unique: true,
    validate: {
      validator: (value: string) => isEmail(value),
      message: 'Поле "email" должно быть валидным',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле "password" должно быть заполнено'],
    select: false,
  },
  name: {
    type: String,
    required: false,
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: false,
    minlength: [2, 'Минимальная длина поля "about" - 2'],
    maxlength: [200, 'Максимальная длина поля "about" - 200'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: false,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
}, { versionKey: false });

userSchema.statics.authUserByCredentials = async function authUserByCredentials(
  email: string,
  password: string,
) {
  const user = await this.findOne({ email }).select('+password');
  if (!user) {
    throw new AuthError('Передан неверный логин или пароль');
  }
  const isCorrect = await bcrypt.compare(password, user.password);
  if (!isCorrect) {
    throw new AuthError('Передан неверный логин или пароль');
  }

  return user;
};

export default model<IUser, UserModel>('user', userSchema);
