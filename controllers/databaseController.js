const pgp = require('pg-promise')();

const cn = {
    host: 'localhost',
    port: 5432,
    database: 'sklep_online',
    user: 'postgres',
    password: '123'
};

const db = pgp(cn);

exports.usernameExists = async function usernameExists(username) {
    try {
        const data = await db.oneOrNone(`SELECT * FROM consumers WHERE username='${username}'`);
        return data;
    } catch (error) {

    }
}

exports.addUser = async function addUser(newUser) {
    try {
        await db.none(`INSERT INTO consumers(username, password, email) 
            VALUES('${newUser.username}',
            crypt('${newUser.password}', gen_salt('bf')),
            '${newUser.email}')`);
    } catch (error) {
        console.log(error);
    }
}