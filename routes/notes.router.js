import { Router } from "express";
import {
  createNote,
  deleteNote,
  readAllNotes,
  readNote,
  readSharedNotes,
  shareNote,
  updateNote
} from "../controllers/notes.controller.js";
import { authenticateUser } from "../middlewares/authenticateUser.js";
import {
  validateCreateNote,
  validateShareNote,
  validateUpdateNote
} from "../middlewares/validateNoteData.js";

const routerNote = Router();

routerNote.post("/", authenticateUser, validateCreateNote, createNote);
routerNote.get("/", authenticateUser, readAllNotes);
routerNote.post("/shared", authenticateUser, validateShareNote, shareNote);
routerNote.get("/shared", authenticateUser, readSharedNotes);
routerNote.get("/:id", authenticateUser, readNote);
routerNote.put("/:id", authenticateUser, validateUpdateNote, updateNote);
routerNote.delete("/:id", authenticateUser, deleteNote);

export default routerNote;
