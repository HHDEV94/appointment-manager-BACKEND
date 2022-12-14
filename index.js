import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import verinarioRoutes from './routes/veterinarioRoutes.js'
import pacienteRoutes from './routes/pacienteRoutes.js'

const app = express()
app.use(express.json())
dotenv.config()
connectDB()

const PORT = process.env.PORT || 4000

app.use('/api/veterinarios', verinarioRoutes)
app.use('/api/pacientes', pacienteRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`)
})
