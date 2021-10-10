// под монгу и монгуз
// для монгуза используются схемы с поялми и т.д.

const { Schema, model } = require("mongoose");

const course = new Schema({
    // поля в модели
    title: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    img: String,

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});
// id по умолчанию сам монгуз добавит

// название модели + схема
module.exports = model("Course", course);
