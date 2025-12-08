import db from "../config/db.js";

export async function findUserByEmail(email) {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
}

export async function createUser(full_name, email, password_hash) {
  await db.query(
    "INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)",
    [full_name, email, password_hash]
  );
}
