import { getInformations, addInformation } from '../../lib/information';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const informations = await getInformations();
    res.status(200).json(informations);
  } else if (req.method === 'POST') {
    const { message, type } = req.body;
    const id = await addInformation({ message, type });
    res.status(201).json({ id });
  } else {
    res.status(405).end();
  }
}
