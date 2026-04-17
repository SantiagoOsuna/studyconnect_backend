import db from '../config/db.js';

export const createUser = (name, email, password) => {
    return db.query(
        'INSERT INTO Users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [name, email, password]
    );
};

export const findUserByEmail = (email) => {
    return db.query(
        'SELECT * FROM Users WHERE email = $1',
        [email]
    );
};

export const findUserById = (id) => {
    return db.query(
        'SELECT id, name, email, created_at FROM Users WHERE id = $1',
        [id]
    );
};

export const getAllUsers = () => {
    return db.query(
        'SELECT id, name, email, created_at FROM Users'
    );
};

export const updateUser = (id, name, email) => {
    return db.query(
        'UPDATE Users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email, created_at',
        [name, email, id]
    );
};

export const deleteUser = (id) => {
    return db.query(
        'DELETE FROM Users WHERE id = $1',
        [id]
    );
}