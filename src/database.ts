import mysql from 'mysql';

// Hay que cambiar esta información por la de nuestra base de datos
const conn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'importproyectotest'
});

export default conn;
