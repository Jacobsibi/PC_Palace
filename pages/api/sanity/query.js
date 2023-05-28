import { client } from "../../../lib/client";

export default async function sanityQuery(req, res) {
    if (req.method !== "GET") {
        return res.status(400).end();
    }

    if (Object.keys(req.query).length === 0) {
        return res.status(400).end();
    }

    let query = req.query.query;

    try {
        const results = await client.fetch(query);
        return res.status(200).json(results).end();
    } catch (error) {
        return res.status(400).end();
    }
}
