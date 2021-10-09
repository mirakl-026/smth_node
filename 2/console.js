// взаимдоействие с консолью
// console.log(process.argv);
/*
[
  'C:\\NodeJS\\node.exe',
  'C:\\Users\\Evgeniy\\Documents\\_my_projects\\_js\\_udemy_node\\udemy_node\\2\\console'
]
*/

// если вызвать так: node console test
/*
[
  'C:\\NodeJS\\node.exe',
  'C:\\Users\\Evgeniy\\Documents\\_my_projects\\_js\\_udemy_node\\udemy_node\\2\\console',
  'test'    -- переданный параметр
]
*/

/*
node console.js message=hello spec
[
  'C:\\NodeJS\\node.exe',
  'C:\\Users\\Evgeniy\\Documents\\_my_projects\\_js\\_udemy_node\\udemy_node\\2\\console.js',
  'message=hello',
  'spec'
]
*/

// функция для работы с переданными параметрами
function consoleToJSON() {
    const c = {}

    for (let i = 2; i < process.argv.length; i++) {
        // достаём параметр
        const arg = process.argv[i].split("=");
        c[arg[0]] = arg[1] ? arg[1] : true; // соглашение
    }

    return c;
}


console.log(consoleToJSON());
// node console.js message=hello spec:
//{ message: 'hello', spec: true }

// node console.js message=hello spec=false
//{ message: 'hello', spec: 'false' }