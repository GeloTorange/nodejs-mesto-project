import { Schema, Types, model } from 'mongoose';

interface ICard {
  name: string,
  link: string,
  owner: Types.ObjectId,
  likes: Types.ObjectId[],
  createdAt: Date,
}

const cardSchema = new Schema<ICard>({
  name: {
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
  },
  link: {
    type: String,
    required: [true, 'Поле "link" должно быть заполнено'],
    validate: {
      validator: (url: string) => /^https?:\/\/(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})([-._~:/?#[\]@!$&'()*+,;=]*)#?$/.test(url),
      message: 'Некорректный формат ссылки',
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле "owner" должно быть заполнено'],
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

export default model<ICard>('card', cardSchema);
