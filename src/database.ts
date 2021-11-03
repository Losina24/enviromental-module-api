import mysql from 'mysql';

const conn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    //password: 'Al8987154St12',
    password: 'root',
    database: 'swat_gesinen'
});

export default conn;