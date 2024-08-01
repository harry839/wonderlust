import Listing from "./models/listings.js";
import ExpressError from "./utils/ExpressError.js";
import { listingSchema, reviewSchema } from "./schema.js";
import Review from "./models/review.js";

const isLoggedin = (req, res, next) => {
  //req.user ===>> IS USED TO IDENTIFY THE USER EXIST OR NOT CHECK BY console.log(req.user)
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be Logged in to Wonderlust!");
    return res.redirect("/user/login");
  }
  next();
};

const saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

const isOwner = async (req, res, next) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error", "Permission Denied!");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

const isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  const reivew = await Review.findById(reviewId);
  if (!reivew.author.equals(res.locals.currUser._id)) {
    req.flash("error", "Permission Denied!");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

//VALIDATION AS AN MIDDLEWARE
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    //we can send here error also directly
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(404, errMsg);
  } else {
    next();
  }
};

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    //we can send here error also directly
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(404, errMsg);
  } else {
    next();
  }
};

export {
  isLoggedin,
  saveRedirectUrl,
  isOwner,
  validateListing,
  validateReview,
  isReviewAuthor,
};
