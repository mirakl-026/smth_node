// модель пользователя

const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                count: {
                    type: Number,
                    required: true,
                    default: 1
                },
                courseId: {
                    type: Schema.Types.ObjectId,
                    ref: "Course",
                    required: true
                }
            }
        ]
    }
});

// обязательно function - потому что this,
// в стрелочной функции this нет
userSchema.methods.addToCart = function(course) {
    // клонирование
    const clonedItems = this.cart.items.concat();

    const idx = clonedItems.findIndex( c => {
        // courseId - объект, поэтому приведение к строке
        return c.courseId.toString() === course._id.toString()
    });

    // если idx найден, увиличиваем кол-во, если нет - добавляем
    if (idx >= 0) {
        clonedItems[idx].count = clonedItems[idx].count + 1;
    } else {
        clonedItems.push({
            count: 1,
            courseId: course._id
        })
    }
    // формирование новой корзины
    const newCart = {items: clonedItems};
    // замена
    this.cart = newCart;

    // либо так
    // this.cart = {items: clonedItems};
    // либо если clonedItems назывался бы items можно было так:
    // this.cart = {items}

    return this.save();
}





// удаление из корзины
userSchema.methods.removeFromCart = function(id) {
    let items = [...this.cart.items]; // клонирование

    const idx = items.findIndex(c => {
        return c.courseId.toString() === id.toString();
    });

    if (items[idx].count === 1) {
        //удалить
        items = items.filter(c => c.courseId.toString() !== id.toString());

    } else {
        // больше 
        items[idx].count--;
    }

    this.cart = {items};
    return this.save();
}



// чистка корзины
userSchema.methods.clearCart = function() {
    this.cart = {
        items: []
    }

    return this.save();
}



module.exports = model("User", userSchema);