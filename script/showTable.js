const pool = require('../config/db'); // pastikan path ini sesuai dengan lokasi db.js Anda

async function showTables() {
  try {
    const [rows] = await pool.query("SHOW TABLES");
    console.log("Tables in the database:");
    rows.forEach(row => {
      console.log(Object.values(row)[0]);
    });
  } catch (err) {
    console.error("Error executing query:", err);
  } finally {
    pool.end(); // tutup koneksi pool setelah selesai
  }
}

showTables();
