import Express from "express";
import {
  test,
  createNote,
  editNote,
  deleteNote,
  createCategory,
  getNotes,
  getCategories,
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
router
  .get("/getNotes", passport.authenticate("jwt", { session: false }), getNotes)
  .get(
    "/getCategories",
    passport.authenticate("jwt", { session: false }),
    getCategories
  );


export default router;
