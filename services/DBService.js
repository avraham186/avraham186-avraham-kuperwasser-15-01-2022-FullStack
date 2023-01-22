const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: 'admin',
    database: 'weather_DB',//if there is no DB comment this line and send create database request, after the DB created uncomment this line
    insecureAuth: true
});

    connection.connect(err => {
        if (err) throw new Error('mySql failed connection',err);
        console.log('connected to SQL server');
    })


function runSQL(sqlCommand) {
    return new Promise((resolve, reject) => {
        connection.query(sqlCommand, function (error, results, fields) {
            if (error) reject(error);
            else resolve(results);
        });
    })
}


//create database
const createDatabase = () => {
    const connection = mysql.createConnection({
        host: 'localhost',
        port: 3307,
        user: 'root',
        password: 'admin',
        insecureAuth: true
    });
    const databaseName = "weather_DB";
    const createQuery = `CREATE DATABASE ${databaseName}`;

    connection.query(createQuery, (err) => {
        if (err) throw err;

        console.log("Database Created Successfully !");

        const useQuery = `USE ${databaseName}`;
        connection.query(useQuery, (error) => {
            if (error) throw error;
            console.log("Using Database");
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
            return console.log(`Created and Using ${databaseName} Database`);
        })
    });
};

// connection.end();
module.exports = {
    runSQL,
    createDatabase
}