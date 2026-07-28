import { prisma } from './db/client'
import express from 'express'

const app = express()
app.use(express.json())

app.get('/users', async (_req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

app.listen(8000, () => {
  console.log('Backend running on port 8000')
})
