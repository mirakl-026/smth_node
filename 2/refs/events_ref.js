// модуль работы с событиями
const EventEmitter = require("events");

// EventEmitter - наследование от данного класса позволяет прослушивать определённые 
// события

class Logger extends EventEmitter {
    // теперь в данном классе доступны 2 метода - on и emit

    log(message) {
        // 1 - название события, 2 - данные для передачи
        this.emit("message", `${message} ${Date.now()}`);
    }

}

const logger = new Logger();    // экземпляр класса Logger

// слушаем событие message
logger.on("message", data => {
    console.log(data);      
});     

logger.log("Hello #1");    // важно чтобы прослушка была добавлена раньше ,чем само событие
logger.log("Hello #2");
logger.log("Hello #3");
// каждый раз вызывая метод log - мы вызываем emit, куда добавляется данные, а поскольку
// это emit - то on - сразу же вызывает console.log

// многие классы в NodeJS являются наследниками EventEmitter 