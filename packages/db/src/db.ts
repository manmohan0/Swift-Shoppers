import pkg from "pg"
import dotenv from "dotenv"

dotenv.config()

const { Pool } = pkg
const pool = new Pool({
    connectionString: process.env.connectionString
})

export default async function connectdb() {
    try {
        const client = await pool.connect()
        console.log("Connected to database")
        return client
    } catch {
        console.error("Error connecting to database")
    }
}

// export default connectdb