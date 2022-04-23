const { Schema, model, Types } = require('mongoose');

// Создаём схему пользователя и перечесляем в обьекте поля для пользователя.
const schema = new Schema({
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    links: [{ type: Types.ObjectId, ref: 'Link' }]
});

module.exports = model('User', schema)