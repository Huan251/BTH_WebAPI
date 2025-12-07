import express from "express";
import { getAllUsers,getUserById,getUserByName,getUserByEmail } from "../controllers/userController.js";


import { getAllAccout, getAccoutById, getAccoutByName, addAccout, updateAccout, deleteAccout } from "../controllers/AccoutController.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to API route 🚀" });
});
router.get("/users", getAllUsers);
router.get("/users/id/:id", getUserById);
router.get("/users/name/:name", getUserByName);
router.get("/users/email/:email", getUserByEmail);





router.get("/accout/id/:TenTK", getAccoutById);
router.get("/accout/name/:MoTa", getAccoutByName);

router.post("/accout/addAccout", addAccout);
router.put("/accout/updateAccout/:TenTK", updateAccout);
router.delete("/accout/deleteAccout/:TenTK", deleteAccout);
export default router;
