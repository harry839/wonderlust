import express from "express";
import { isLoggedin, isOwner, validateListing } from "../middleware.js";
import {
  index,
  newListing,
  createListing,
  showListing,
  editListing,
  updateListing,
  deleteListing,
} from "../controllers/listings.js";
import multer from "multer";
import { storage } from "../cloudConfig.js";
const router = express.Router();
const upload = multer({ storage });

//INDEX ROUTE
router.get("/", index);

//NEW ROUTE
router.get("/new", isLoggedin, isLoggedin, newListing);

//ADD NEW LISTING
//router.post("/newListing", isLoggedin, validateListing, createListing);
router.post(
  "/newListing",
  isLoggedin,
  upload.single("listing[image]"),
  validateListing,
  createListing
);

//IF MORE THAN ONE METHOD USES SAME ROUTE THEN USE router.route()
router
  .route("/:id")
  //SHOW ROUTE
  .get(showListing)
  //DELETE ROUTE
  .delete(isLoggedin, isOwner, deleteListing);

//EDIT ROUTE
router.get("/:id/edit", isLoggedin, isOwner, editListing);

//UPDATE ROUTE
router.put(
  "/:id/update",
  isLoggedin,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  updateListing
);

export default router;
