// загрузка файлов
const multer = require("multer");

// куда и как сохранять файлы
const storage = multer.diskStorage({
    // функции над файлами

    // куда складывать файлы
    destination(req, file, cb) {
        cb(null, "images");
    },
    // как назвать файл
    filename(req, file, cb) {
        cb(null, new Date().toISOString() + "-" + file.originalname)
    }
});   



// валидация для файлов

// проверка на то, что это изображение
const allowedTypes = ["image/png", "image/jpeg", "image/jpeg"]


const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

module.exports = multer({
    // конфигурация
    storage: storage,
    fileFilter : fileFilter
})