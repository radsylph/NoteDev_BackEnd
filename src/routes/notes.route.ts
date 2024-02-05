import Express from "express";
import {
  test,
  createNote,
  editNote,
  deleteNote,
  createCategory,
} from "../controllers/notes.controllers";
import passport from "passport";
const router = Express.Router();

router.get("/test", test);
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  createNote
);
router.put(
  "/edit/:note_id",
  passport.authenticate("jwt", { session: false }),
  editNote
);
router.delete(
  "/delete/:note_id",
  passport.authenticate("jwt", { session: false }),
  deleteNote
);
router.post(
  "/category",
  passport.authenticate("jwt", { session: false }),
  createCategory
);

export default router;
