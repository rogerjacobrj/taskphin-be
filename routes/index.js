import express from "express";
import dotenv from 'dotenv';
import { getCandidates, addCandidate } from "../controllers/index.js";

dotenv.config();

const routes = express.Router();

routes.get("/", getCandidates);
routes.post("/", addCandidate);

export default routes;