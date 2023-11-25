import Joi from "joi";

const createNoteSchema = Joi.object({
  title: Joi.string().required().min(4).max(30).label("Title"),
  body: Joi.string().required().min(10).max(2500).label("Body")
});

export function validateCreateNote(req, res, next) {
  const { error } = createNoteSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}

const updateNoteSchema = Joi.object({
  title: Joi.string().optional().min(4).max(30).label("Title"),
  body: Joi.string().optional().min(10).max(2500).label("Body")
});

export function validateUpdateNote(req, res, next) {
  const { error } = updateNoteSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}

const shareNoteSchema = Joi.object({
  noteId: Joi.string()
    .required()
    .guid({ version: ["uuidv4"] })
    .label("Note ID"),
  sharedWithUserId: Joi.string()
    .required()
    .guid({ version: ["uuidv4"] })
    .label("User ID")
});

export function validateShareNote(req, res, next) {
  const { error } = shareNoteSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}
