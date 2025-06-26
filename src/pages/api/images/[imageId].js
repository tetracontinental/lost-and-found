import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  // imageIdパラメータの取得方法を修正
  const imageIdParam = Array.isArray(req.query.imageId) ? req.query.imageId[0] : req.query.imageId;
  const [itemId, idx] = imageIdParam.split('_');
  const client = await clientPromise;
  const db = client.db();
  const image = await db.collection('images').findOne({
    itemId: itemId,
    url: `/api/images/${itemId}_${idx}`,
  });
  if (!image) {
    res.status(404).end();
    return;
  }
  // dataがBuffer型かBinary型かで分岐
  let buffer;
  if (Buffer.isBuffer(image.data)) {
    buffer = image.data;
  } else if (image.data && image.data.buffer) {
    buffer = Buffer.from(image.data.buffer);
  } else if (image.data && image.data.base64) {
    buffer = Buffer.from(image.data.base64, 'base64');
  } else {
    res.status(500).send('Invalid image data');
    return;
  }
  res.setHeader('Content-Type', 'image/jpeg'); // 必要に応じてimage/pngに
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.end(buffer);
}

export const config = {
  api: {
    responseLimit: false,
  },
};
