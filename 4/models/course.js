// под монгу и монгуз
// для монгуза используются схемы с поялми и т.д.

const { Schema, model } = require("mongoose");

const courseSchema = new Schema({
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


// courseSchema.method("toClient", function() {
//     const course = this.toObject();

//     course.id = course._id;

//     delete course._id;

//     return course;
// });


// название модели + схема
module.exports = model("Course", courseSchema);
