import pool from './server/db.mjs';

async function test() {
  const [rows] = await pool.query('SELECT content FROM blog_slug WHERE content LIKE "%FAQ%" LIMIT 1');
  console.log(rows[0]?.content.substring(0, 2000) || 'No content found');
  process.exit(0);
}
test();
