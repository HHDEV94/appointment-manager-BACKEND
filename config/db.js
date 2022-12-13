import mongoose from 'mongoose'

mongoose.set('strictQuery', true)

const connectDB = async () => {
  try {
    const connection = process.env.MONGO_URI

    const db = await mongoose.connect(connection, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    const url = `${db.connection.host}:${db.connection.port}`
    console.log(`MongoDB connected in: ${url}`)
  } catch (error) {
    console.log(`error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
