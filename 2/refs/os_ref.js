const os = require("os");

// Operation System
// позволяет узнать окружение в котором работаем

console.log(os.platform()); // win32

console.log(os.arch()); // архитектура CPU - x64

// общая информация о CPU
// console.log(os.cpus());
/*
[
  {
    model: 'AMD Ryzen 3 PRO 3200G with Radeon Vega Graphics',
    speed: 3593,
    times: { user: 710203, nice: 0, sys: 471796, idle: 10207156, irq: 78546 }
  },
  {
    model: 'AMD Ryzen 3 PRO 3200G with Radeon Vega Graphics',
    speed: 3593,
    times: { user: 766671, nice: 0, sys: 362218, idle: 10260093, irq: 9937 } 
  },
  {
    model: 'AMD Ryzen 3 PRO 3200G with Radeon Vega Graphics',
    speed: 3593,
    times: { user: 718593, nice: 0, sys: 361750, idle: 10308640, irq: 25750 }
  },
  {
    model: 'AMD Ryzen 3 PRO 3200G with Radeon Vega Graphics',
    speed: 3593,
    times: { user: 854000, nice: 0, sys: 410734, idle: 10124250, irq: 39890 }
  }
]
*/

// сколько свободной памяти
console.log(os.freemem());  // 10207633408

// сколько всего памяти
console.log(os.totalmem()); // 14978596864

// корневая директория
console.log(os.homedir());  // C:\Users\Evgeniy

// сколько система уже работает
console.log(os.uptime());   // 11560 - число в миллисекундах (с момента запуска ПК)