import jwt from "jsonwebtoken";

export function generateToken(user) {
  return jwt.sign(
    { id: user.id, role: user.role },
    "SUPER_SECRET_KEY",
    { expiresIn: "7d" }
  );
}
