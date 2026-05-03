import mysql from "mysql2/promise"

let pool: mysql.Pool

function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      uri: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      waitForConnections: true,
      connectionLimit: 10,
    })
  }
  return pool
}

export default getPool()