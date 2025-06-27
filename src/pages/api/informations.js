import { getInformations, addInformation } from '../../lib/information';

export async function onRequest(context) {
  const { request, env } = context;
  if (request.method === 'GET') {
    const informations = await getInformations(env);
    return new Response(JSON.stringify(informations), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } else if (request.method === 'POST') {
    const body = await request.json();
    const { message, type } = body;
    const id = await addInformation(env, { message, type });
    return new Response(JSON.stringify({ id }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    return new Response('Method Not Allowed', { status: 405 });
  }
}
