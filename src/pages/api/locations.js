import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const locations = await prisma.location.findMany();
    res.status(200).json(locations);
  } else {
    res.status(405).end();
  }
}
