import { register, login } from "../services/auth.service.js";

export async function registerUser(req, res) {
  await register(req.body);
  res.status(201).json({ message: "Register successful" });
}

export async function loginUser(req, res) {
  const token = await login(req.body.email, req.body.password);
  if (!token) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  res.json({ token });
}
