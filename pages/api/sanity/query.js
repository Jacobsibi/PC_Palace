import { client } from "../../../lib/client";

export default async function sanityQuery(req, res) {
    let query = req.query.query;

    const results = await client.fetch(query);
    res.status(200).json(results);
}
