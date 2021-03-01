import mongoose from 'mongoose'
import { config } from 'dotenv'
config()
/* Credits to Worn Off Keys */
const mongoPath: string | undefined = process.env.MONGO

export default async () => {
  await mongoose.connect(mongoPath!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    keepAlive: true,
  })
  return mongoose
}