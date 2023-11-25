import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

const prisma = new PrismaClient();
dotenv.config();

// Create a new Note
export async function createNote(req, res) {
  try {
    let note = await prisma.note.create({
      data: { ...req.body, userId: req.user.id }
    });

    if (note)
      return res.status(201).send({
        message: "Note created successfully.",
        note
      });
    return res.status(400).send({
      message: "Error creating note.",
      note
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

// Read all Notes by User ID
export async function readAllNotes(req, res) {
  try {
    let notes = await prisma.note.findMany({
      where: { userId: req.user.id }
    });

    if (notes.length <= 0) {
      return res.status(404).send({
        message: "You don't have any notes yet."
      });
    }

    return res.status(200).send({
      message: "Note/Notes fetched successfully.",
      notes
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

// Read a Note by its ID
export async function readNote(req, res) {
  try {
    const { id } = req.params;
    let note = await prisma.note.findUnique({
      where: { id },
      select: {
        title: true,
        body: true,
        userId: true,
        user: {
          select: {
            username: true
          }
        },
        sharedNotes: {
          select: {
            sharedToUser: {
              select: {
                username: true
              }
            }
          }
        }
      }
    });

    if (!note) {
      return res.status(404).send({
        message: "Not Found."
      });
    }

    if (note.userId !== req.user.id) {
      return res.status(403).send({
        message: "You are not author of this note"
      });
    }

    return res.status(200).send({
      message: "Note fetched successfully.",
      note
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

// Update an existing Note
export async function updateNote(req, res) {
  try {
    const { id } = req.params;
    let note = await prisma.note.findUnique({
      where: { id }
    });

    if (!note) {
      return res.status(404).send({
        message: "Not Found."
      });
    }

    if (note.userId !== req.user.id) {
      return res.status(403).send({
        message: "You are not author of this note"
      });
    }

    note = await prisma.note.update({
      where: { id },
      data: { ...req.body }
    });

    return res.status(201).send({
      message: "Note updated successfully.",
      note
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

// Delete an existing Note
export async function deleteNote(req, res) {
  try {
    const { id } = req.params;
    let note = await prisma.note.findUnique({
      where: { id }
    });

    if (!note) {
      return res.status(404).send({
        message: "Not Found."
      });
    }

    if (note.userId !== req.user.id) {
      return res.status(403).send({
        message: "You are not author of this note"
      });
    }

    await prisma.note.delete({
      where: { id }
    });

    return res.status(201).send({ message: "Note deleted successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

// Share a note with an other User
export async function shareNote(req, res) {
  try {
    const { sharedWithUserId, noteId } = req.body;

    let note = await prisma.note.findUnique({
      where: { id: noteId }
    });

    let user = await prisma.user.findUnique({
      where: { id: sharedWithUserId }
    });

    if (!note || !user) {
      let message = note ? "User not found." : "Note not found.";
      return res.status(404).send({ message: message });
    }

    if (note.userId !== req.user.id) {
      return res.status(403).send({
        message: "You are not author of this note"
      });
    }

    await prisma.noteSharing.create({
      data: {
        noteId: note.id,
        sharedToUserId: user.id
      }
    });

    return res.status(201).send({ message: "Note shared successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

// Read shared notes by user ID
export async function readSharedNotes(req, res) {
  try {
    let notes = await prisma.note.findMany({
      where: {
        sharedNotes: {
          some: {
            sharedToUserId: req.user.id
          }
        }
      },
      select: {
        id: true,
        title: true,
        body: true,
        user: {
          select: { username: true }
        }
      }
    });

    if (notes.length <= 0) {
      return res.status(404).send({ message: "Shared notes not found." });
    }

    return res
      .status(201)
      .send({ message: "Shared Notes fetched successfully.", notes });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
}
