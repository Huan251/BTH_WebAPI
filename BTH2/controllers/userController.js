import { userRepo } from "../repositories/user.js";

export const getUsers = async (req, res) => {
  try {
    const users = await userRepo.getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

