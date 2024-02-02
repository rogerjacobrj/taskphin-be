import express from "express";
import dotenv from 'dotenv';
import {
    getCandidates, addCandidate, updateCandidate,
    deleteCandidate, getCandidateDetails
} from "../controllers/index.js";

dotenv.config();

const routes = express.Router();

routes.get("/", getCandidates);
routes.post("/", addCandidate);
routes.get("/:id", getCandidateDetails);
routes.put("/:id", updateCandidate);
routes.delete("/:id", deleteCandidate);

export default routes;