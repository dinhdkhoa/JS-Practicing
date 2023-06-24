import express from "express";
import userController from "../controllers/users.js";

const router = express.Router();

router.get("/", userController.getAllUsers);

router.post("/", userController.addUser);

router.get("/:id", userController.getUserWithID);

router.patch("/:id", userController.patchUser);

router.delete("/:id", userController.deleteUser);

export default router;
