const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function syncOrders(orders) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const order of orders) {
      await client.query(
        'INSERT INTO orders (user_id, items, total, created_at) VALUES ($1, $2, $3, $4)',
        [order.user_id, order.items, order.total, order.created_at]
      );
    }
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

module.exports = { syncOrders };
