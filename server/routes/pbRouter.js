import express from "express";
import { RoutePath } from "../constants/routes.js";
import { addNewContact, deleteContact, getAllContacts, updateContact } from "../controllers/user.js";

const router = express.Router();

// Read
router.get(RoutePath.HOME, getAllContacts);

// Update
router.post(RoutePath.ADDUSER, addNewContact);
router.patch(RoutePath.UPDATEUSER, updateContact);

// Delete
router.delete(RoutePath.DELETEUSER, deleteContact);

export default router;
