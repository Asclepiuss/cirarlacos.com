import bcrypt from "bcrypt";
import { findUserByEmail, createUser } from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";

export async function signup(req, res) {
  const { full_name, email, password } = req.body;

  if (!full_name || !email || !password)
    return res.status(400).json({ error: "Fill all fields." });

  const existing = await findUserByEmail(email);
  if (existing) return res.status(400).json({ error: "Email already used." });

  const password_hash = await bcrypt.hash(password, 10);

  await createUser(full_name, email, password_hash);

  return res.json({ success: true });
}

export async function login(req, res) {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user) return res.status(400).json({ error: "Invalid credentials." });

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(400).json({ error: "Invalid credentials." });

  const token = generateToken(user);

  return res.json({
    success: true,
    token,
    role: user.role,
  });
}
