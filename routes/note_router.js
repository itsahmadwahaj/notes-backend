import { Router } from "express";
import {
  createNote,
  deleteNote,
  readAllNotes,
  readNote,
  readSharedNotes,
  shareNote,
  updateNote,
} from "../controllers/note_controller.js";
import { authenticateUser } from "../middlewares/authenticateUser.js";
import {
  validateCreateNote,
  validateShareNote,
  validateUpdateNote,
} from "../middlewares/validateNoteData.js";

const routerNote = Router();

routerNote.post(
  "/api/v1/note/create",
  authenticateUser,
  validateCreateNote,
  createNote
);
routerNote.get("/api/v1/note/readAll", authenticateUser, readAllNotes);
routerNote.get("/api/v1/note/read/:id", authenticateUser, readNote);
routerNote.put(
  "/api/v1/note/update/:id",
  authenticateUser,
  validateUpdateNote,
  updateNote
);
routerNote.delete("/api/v1/note/delete/:id", authenticateUser, deleteNote);
routerNote.post(
  "/api/v1/note/share",
  authenticateUser,
  validateShareNote,
  shareNote
);
routerNote.get(
  "/api/v1/note/readAllSharedNotes",
  authenticateUser,
  readSharedNotes
);

export default routerNote;
