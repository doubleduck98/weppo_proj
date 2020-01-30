const pgp = require('pg-promise')();
const dbconfig = require('../databaseConf');

const db = pgp(dbconfig.config);

exports.getUser = async (username) => {
    try {
        const data = await db.oneOrNone(`SELECT id, username FROM consumers WHERE username='${username}'`);
        return data;
    } catch (error) {
        console.log(error);
    }
};

// todo: jakieś true/false zamiast data zwracaj byku
exports.authenticateLogin = async (user) => {
    try {
        const data = await db.oneOrNone(`SELECT password = crypt('${user.password}', password) AS pwd_match FROM consumers WHERE username='${user.username}'`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

exports.usernameExists = async (username) => {
    try {
        const data = await db.oneOrNone(`SELECT FROM consumers WHERE username='${username}'`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

exports.addUser = async (newUser) => {
    try {
        await db.none(`INSERT INTO consumers(username, password, email) 
                VALUES('${newUser.username}', crypt('${newUser.password}', gen_salt('bf')), '${newUser.email}')`);
    } catch (error) {
        console.log(error);
    }
}

exports.getItems = async () => {
    try {
        const data = await db.manyOrNone('SELECT * FROM products');
        return data;
    } catch (error) {
        console.log(error);
    }
}