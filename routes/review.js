import express from "express";
import { validateReview, isLoggedin, isReviewAuthor } from "../middleware.js";
import { createReview, deleteReview } from "../controllers/reviews.js";

//here mergeParams is used to access the parent route info
const router = express.Router({ mergeParams: true });

//CREATING A POST ROUTE
router.post("/", isLoggedin, validateReview, createReview);

//DELETE REVIEW ROUTE
router.delete("/:reviewId", isLoggedin, isReviewAuthor, deleteReview);

export default router;
