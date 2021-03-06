import express from "express";
import { ShowController } from "../controller/ShowController";


export const showRouter = express.Router();

const showController = new ShowController();

showRouter.post("/register", showController.createShow);
showRouter.get("/:id", showController.getShowByDate);