import mongoose from "mongoose";
import initData from "./data.js";
import Listing from "../models/listings.js";

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  const initDB = initData.map((obj) => ({
    ...obj,
    owner: "668f8044cfdc015bfbd47f91",
  }));
  await Listing.insertMany(initDB);
  console.log("Data is saved successfully");
};

initDB();
