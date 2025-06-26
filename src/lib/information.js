import clientPromise from './mongodb';

export async function getInformations() {
  const client = await clientPromise;
  const db = client.db();
  return db.collection('informations').find({}).sort({ createdAt: -1 }).toArray();
}

export async function addInformation({ message, type = 'info' }) {
  const client = await clientPromise;
  const db = client.db();
  const result = await db.collection('informations').insertOne({ message, type, createdAt: new Date() });
  return result.insertedId;
}
