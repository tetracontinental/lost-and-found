// Cloudflare D1用ラッパー
// Pages Functionsのenv.D1で取得する想定

export function getDB(env) {
  return env.DB; // wrangler.tomlでbinding名をDBにする想定
}

// D1でクエリを実行するヘルパー
export async function queryDB(env, sql, params = []) {
  const db = getDB(env);
  return await db.prepare(sql).bind(...params).all();
}

export async function executeDB(env, sql, params = []) {
  const db = getDB(env);
  return await db.prepare(sql).bind(...params).run();
}
