const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: 'admin',
    insecureAuth: true
});

connection.connect((err) => {
    if (err) throw new Error('mySql failed connection', err);
    console.log('connected to SQL server');
    const query = 'SELECT count(*) FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = "weather_DB"'
    connection.query(query, (err, rows) => {
        const isDBExist = Object.values(JSON.parse(JSON.stringify(rows[0])))[0]
        if (isDBExist === 1) {
            const useQuery = 'USE weather_DB';
            connection.query(useQuery, (error) => {
                if (error) throw error;
                console.log("Using Database weather_DB");
            })
        } else {
            createDataBase()
        }
    });
})


function runSQL(sqlCommand,varArr) {
    return new Promise((resolve, reject) => {
        connection.execute(sqlCommand,varArr, function (error, results, fields) {
            if (error) reject(error);
            else resolve(results);
        });
    })
}
// function runSQL(sqlCommand) {
//     return new Promise((resolve, reject) => {
//         connection.query(sqlCommand, function (error, results, fields) {
//             if (error) reject(error);
//             else resolve(results);
//         });
//     })
// }

function createDataBase() {
    const databaseName = "weather_DB";
    const query = `CREATE DATABASE ${databaseName}`

    connection.query(query, (err) => {
        if (err) throw err;
        console.log("Database Created Successfully !");

        const useQuery = `USE ${databaseName}`;
        connection.query(useQuery, (error) => {
            if (error) throw error;
            console.log(`Using Database ${databaseName}`);

            const tables = [
                { name: 'cities', columns: ['id', 'weatherTxt', 'temp'] },
                { name: 'favorite_cities', columns: ['cityKey', 'localizedName'] }
            ]
            tables.forEach((table) => {
                if (table.name === 'cities') {
                    connection.query(`CREATE TABLE ${table.name} (
                    ${table.columns[0]} varchar(255),
                    ${table.columns[1]} varchar(255),
                    ${table.columns[2]} varchar(255))`
                    )
                } else {
                    connection.query(`CREATE TABLE ${table.name} (
                        ${table.columns[0]} varchar(255),
                        ${table.columns[1]} varchar(255))`
                    )
                }
            })
            return console.log(`Using ${databaseName} Database and tables ${tables[0].name} and ${tables[1].name}Created`);
        })
    })
}


module.exports = {
    runSQL,
}