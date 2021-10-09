const express = require("express");

// объект app - аналог объекта server, у него можно вызвать Listen
const app = express();

const PORT = process.env.PORT || 3000;  // либо указанный порт, либо 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
});