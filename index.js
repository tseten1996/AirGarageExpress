const express = require("express");
const morgan = require("morgan");
const axios = require("axios");
var cors = require('cors')

const app = express();

const PORT = process.env.PORT || 5000;
const token = 'mi5qSSqdhmrNXBjLq5MBMwuqcS0q8aE4u52fwqrG8CkrBjjksgdV8ZblHdh4ThtDqQVFapfOwrCqadcTH4sJIMhQgEcWpc0bK_9ms_rJ1H-xMT1Amp4tmH_PhAg3X3Yx';
const baseApiUrl = 'https://api.yelp.com/v3/businesses/search';
const headers = {
    'Authorization':`Bearer ${token}`,
    "Access-Control-Allow-Origin": "*",
    "accept": "application/json"
}

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.options('*', cors());

app.get("/yelp", async (req, res) => {
    try {
        const location = req.query.location;
        const limit = req.query.limit;
        const offset = req.query.offset;
        const result = await axios.get(baseApiUrl , {
            headers: headers,
            params: {term: "parking", categories: "parking", location: location, sort_by: "rating", limit: limit, offset: offset }
        });
        return res.send({
            data: result.data
        })
    } catch (error) {
        return res.send({
            error: error
        })
    }
});

app.listen(PORT, () => {
    console.log("Server started listening on prot: ", PORT);
})


