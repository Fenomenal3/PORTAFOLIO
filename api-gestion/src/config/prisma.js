const { PrismaPg } = require(`@prisma/adapter-pg`);
const { PrismaClient } = require(`@prisma/client`);

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
module.exports=prisma