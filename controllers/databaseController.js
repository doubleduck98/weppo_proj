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

exports.getUsers = async () => {
    try {
        const data = await db.many(`SELECT id, username, email FROM consumers`);
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

exports.getItem = async (id) => {
    try {
        const data = await db.oneOrNone(`SELECT * FROM products WHERE id=${id}`)
        return data;
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

exports.getItemsFiltered = async (searchQuery) => {
    try {
        const data = await db.manyOrNone(`SELECT * FROM products WHERE LOWER(name) LIKE LOWER('%${searchQuery}%') OR LOWER(description) LIKE LOWER('%${searchQuery}%')`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

exports.addItem = async (item) => {
    try {
        await db.none(`INSERT INTO products(name, price, description, img) VALUES('${item.name}', ${item.price}, '${item.description}', '${item.img}')`);
    } catch (error) {
        console.log(error);
    }
}

exports.getOrders = async () => {
    try {
        const data = await db.manyOrNone('SELECT * FROM orders');
        return data;
    } catch (error) {
        console.log(error);
    }
}

exports.addOrder = async (order) => {
    try {
        await db.none(`INSERT INTO orders(item, amount, date) VALUES('${order.itemName}', ${order.amount}, current_timestamp)`);
    } catch (error) {
        console.log(error);
    }
}