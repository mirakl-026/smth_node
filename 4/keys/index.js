// объект конфигурации для приложения

module.exports = {
    MONGODB_URI: "mongodb://127.0.0.1:27017/app_courses",
    SESSION_SECRET: "lumber0jack2",
    EMAIL_FROM: "mirakl026@yandex.ru",
    BASE_URL: "http://localhost:3000",
    MAIL_HOST: {
        host: 'smtp.yandex.ru',
        port: 465 ,
        secure: true,
        auth: {
          user: "mirakl026@yandex.ru",
          pass: "wJNCNJTz!Up5-iA",
        }
    }
}

// SENDGRID_API_KEY: "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",