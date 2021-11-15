const mysql = require('mysql')

const connection = mysql.createConnection({
    connectionLimit: 10,
    host: 'localhost',
    user:'root',
    password: 'Taken123@',
    database:'yashdb'
})

module.exports = connection