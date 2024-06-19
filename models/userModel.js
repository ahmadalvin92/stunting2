const db = require("../config/db");

const User = {
  findByEmail: async (email) => {
    const [rows] = await db.query(
      "SELECT id, email, password, name, phone, address, gender, birth_date FROM users WHERE email = ?",
      [email]
    );
    return rows[0];
  },
  findById: async (id_user) => {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE id = ?",
      [id_user]
    );
    return rows[0];
  },
  create: async (user) => {
    const [result] = await db.query("INSERT INTO users SET ?", user);
    return result.insertId;
  },
  update: async (id_user, user) => {
    await db.query("UPDATE users SET ? WHERE id = ?", [user, id_user]);
  },
};

module.exports = User;

