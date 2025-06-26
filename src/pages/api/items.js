import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { q, locationId } = req.query;
    const where = {};
    if (q) {
      where.OR = [
        { description: { contains: q, mode: 'insensitive' } },
      ];
    }
    if (locationId) {
      where.locationId = Number(locationId);
    }
    const items = await prisma.item.findMany({
      where,
      include: { location: true },
      orderBy: { createdAt: 'desc' },
    });
    res.status(200).json(items);
  } else if (req.method === 'POST') {
    const { imageUrl, description, locationId } = req.body;
    const item = await prisma.item.create({
      data: { imageUrl, description, locationId: Number(locationId) },
    });
    res.status(201).json(item);
  } else {
    res.status(405).end();
  }
}
