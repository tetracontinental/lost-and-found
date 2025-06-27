import { queryDB, executeDB } from './d1';

export async function getInformations(env) {
  const sql = 'SELECT id, message, type, createdAt FROM informations ORDER BY createdAt DESC';
  const { results } = await queryDB(env, sql);
  return results;
}

export async function addInformation(env, { message, type = 'info' }) {
  const sql = 'INSERT INTO informations (message, type, createdAt) VALUES (?, ?, ?)';
  const now = new Date().toISOString();
  const result = await executeDB(env, sql, [message, type, now]);
  return result.lastRowId;
}
