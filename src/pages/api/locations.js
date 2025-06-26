import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db();
  if (req.method === 'GET') {
    const locations = await db.collection('locations').find({}).toArray();
    res.status(200).json(locations);
  } else if (req.method === 'POST') {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'name is required' });
    const result = await db.collection('locations').insertOne({ name });
    res.status(201).json({ id: result.insertedId, name });
  } else {
    res.status(405).end();
  }
}
