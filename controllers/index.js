import pkg from 'pg';
import dotenv from 'dotenv';

const { Client } = pkg;

dotenv.config();

const connectionString = process.env.DB_CONNECTION_STRING;

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

