import mysql from 'promise-mysql';

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    database: "students_DB",
    user: "root",
    password: "Wednesday"
});

export function connectToDB(query) {
    return connection.then(conn => conn.query(query));
}
