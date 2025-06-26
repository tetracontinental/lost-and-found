import clientPromise from '../../lib/mongodb';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db();
  if (req.method === 'GET') {
    const { q, locationId } = req.query;
    const filter = {};
    if (q) {
      filter.description = { $regex: q, $options: 'i' };
    }
    if (locationId) {
      filter.locationId = locationId;
    }
    const items = await db.collection('items').find(filter).sort({ createdAt: -1 }).toArray();
    // location, imagesをJOIN的に取得
    const locations = await db.collection('locations').find({}).toArray();
    const images = await db.collection('images').find({}).toArray();
    const itemsWithDetails = items.map(item => ({
      ...item,
      location: locations.find(l => l._id.toString() === item.locationId),
      images: images.filter(img => img.itemId === item._id.toString()).map(img => ({ url: img.url })),
    }));
    res.status(200).json(itemsWithDetails);
  } else if (req.method === 'POST') {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      if (err) return res.status(400).json({ error: 'ファイル解析エラー' });
      const { description, locationId } = fields;
      let images = files.images;
      if (!Array.isArray(images)) images = images ? [images] : [];
      if (images.length > 5) images = images.slice(0, 5);
      const now = new Date();
      // Item作成
      const itemResult = await db.collection('items').insertOne({
        description: description + '',
        locationId: locationId + '',
        createdAt: now,
      });
      const itemId = itemResult.insertedId.toString();
      // 画像保存
      const imageCreates = await Promise.all(images.map(async (img, idx) => {
        const data = await fs.promises.readFile(img.filepath);
        const url = `/api/images/${itemId}_${idx}`;
        await db.collection('images').insertOne({
          data,
          itemId,
          url,
        });
        return { url };
      }));
      res.status(201).json({ _id: itemId, description, locationId, images: imageCreates });
    });
  } else {
    res.status(405).end();
  }
}
