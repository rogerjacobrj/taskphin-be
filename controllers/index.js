import pkg from 'pg';
import dotenv from 'dotenv';
import { getScoreForKey } from "../helpers/index.js";

const { Client } = pkg;

dotenv.config();

const connectionString = process.env.DB_CONNECTION_STRING;

// Candidates list
export const getCandidates = async (_req, res) => {
    try {
        const client = new Client({
            connectionString,
        });
        await client.connect();
        const result = await client.query('SELECT * FROM Candidates');
        await client.end();

        return res.status(200).json({
            status: true,
            data: result.rows
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Failed to fetch candidate list"
        });
    }
};

// Add new candidate
export const addCandidate = async (req, res) => {
    const body = req.body;

    const client = new Client({
        connectionString,
    });

    if (!body.name || !body.email || !body.phone || !body.status || !body.salary
        || !body.skills || Object.keys(body.skills).length < 2) {
        return res.status(400).json({
            status: false,
            message: "Please provide all details"
        });
    }

    let computedScore = 0;

    for (let item in body.skills) {
        const score = getScoreForKey(body.skills[item]);
        computedScore += score;
    }

    try {
        await client.connect();

        const query = {
            text: 'INSERT INTO Candidates(name, email, phone, status, skills, salary, score) VALUES($1, $2, $3, $4, $5, $6, $7)',
            values: [body.name, body.email, body.phone, body.status, body.skills, body.salary, computedScore],
        };

        const result = await client.query(query);
        await client.end();

        return res.status(200).json({
            status: true,
            data: result.rows
        });
    } catch (error) {
        console.log(error);
        await client.end();

        return res.status(500).json({
            status: false,
            message: "Failed to add candidate"
        });
    }
};

// Update candidate details
export const updateCandidate = async (req, res) => {
    const body = req.body;
    const candidateid = req.params.id;
    
    if (!candidateid) {
        return res.status(400).json({
            status: false,
            message: "Please enter the candidate id"
        });
    }

    const client = new Client({
        connectionString,
    });

    if (!body.name || !body.email || !body.phone || !body.status || !body.salary
        || !body.skills || Object.keys(body.skills).length < 2) {
        return res.status(400).json({
            status: false,
            message: "Please provide all details"
        });
    }

    let computedScore = 0;

    for (let item in body.skills) {
        const score = getScoreForKey(body.skills[item]);
        computedScore += score;
    }

    try {
        await client.connect();

        const updateQuery = `
            UPDATE Candidates
            SET Name = $1, Email = $2, Phone = $3, Status = $4, Skills = $5, Salary = $6, Score = $7
            WHERE candidateid = $8
        `;

        const result = await client.query(updateQuery, [body.name, body.email, body.phone, body.status, body.skills, body.salary, computedScore, id]);
        await client.end();

        return res.status(200).json({
            status: true,
            result
        });
    } catch (error) {
        console.log(error);
        await client.end();

        return res.status(500).json({
            status: false,
            message: "Failed to update candidate details"
        });
    }
};

// Get candidate details
export const getCandidateDetails = async (req, res) => {
    const candidateid = req.params.id;

    if (!candidateid) {
        return res.status(400).json({
            status: false,
            message: "Please enter the candidate id"
        });
    }

    try {
        const client = new Client({
            connectionString,
        });

        await client.connect();
        const result = await client.query(`Select * FROM Candidates WHERE candidateid=${candidateid}`);
        await client.end();

        return res.status(200).json({
            status: true,
            data: result.rows
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Failed to fetch candidate details"
        });
    }
};

// Delete a candidate
export const deleteCandidate = async (req, res) => {
    const candidateid = req.params.id;

    if (!candidateid) {
        return res.status(400).json({
            status: false,
            message: "Please enter the candidate id"
        });
    }

    try {
        const client = new Client({
            connectionString,
        });

        await client.connect();
        await client.query(`DELETE FROM Candidates WHERE candidateid=${candidateid}`);
        await client.end();

        return res.status(200).json({
            status: true
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Failed to delete candidate"
        });
    }
};