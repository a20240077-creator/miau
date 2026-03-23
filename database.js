require('dotenv').config();

let mysql = null;
try {
    mysql = require('mysql2/promise');
} catch (error) {
    mysql = null;
}

const DB_ENABLED = process.env.DB_ENABLED === 'true' && Boolean(mysql);

let pool = null;

if (DB_ENABLED) {
    pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT || 3306),
        database: process.env.DB_NAME || 'edu_integral',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
}

async function testConnection() {
    if (!pool) {
        return {
            enabled: false,
            connected: false,
            message: 'Modo demo activo. La base de datos MySQL no está habilitada.'
        };
    }

    try {
        const connection = await pool.getConnection();
        connection.release();

        return {
            enabled: true,
            connected: true,
            message: 'Conexión a MySQL establecida correctamente.'
        };
    } catch (error) {
        return {
            enabled: true,
            connected: false,
            message: `No se pudo conectar a MySQL: ${error.message}`
        };
    }
}

module.exports = {
    pool,
    DB_ENABLED,
    testConnection
};
