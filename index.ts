import 'dotenv/config'; 
import express from "express"
import { filmeRouter } from "./src/interface/routes/filmeRoutes"
import cors from "cors"
import pool from './src/config/database';


// Create an Express application
const app = express()
const port = process.env.PORT || 5000

// Middleware
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const apiV1Router = express.Router()

apiV1Router.use('/filmes', filmeRouter())

app.use('/api/v1', apiV1Router)

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" })
})

// Start the server
const startServer = async () => {
  try {
    await pool.connect()
     console.log('Database connected!');
    // Start listening for requests
    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  } catch (error) {
    console.error("Failed to start server:", error)
    process.exit(1)
  }
}

startServer()