import { PrismaClient } from '@prisma/client'
import { PrismaPostgres } from '@prisma/adapter-postgresql'

const adapter = new PrismaPostgres(process.env.DATABASE_URL!)
export const prisma = new PrismaClient({ adapter })
