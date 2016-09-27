const express = require('express');
const {FetchModule} = require('microstar-track');

let fetchModule;
const router = express.Router();

router.get('/', (req, res) => {
    const payload = {
        limit: +req.query.limit || null,
    };

    fetchModule.getAll(payload)
        .then((data) => {
            res.status(200).json({
                status: 200,
                results: data,
            });
        })
        .catch((err) => {
            res.status(500).json({
                status: 500,
                error: err,
            });
        });
});

const RouterConstructor = (config) => {
    fetchModule = new FetchModule(config);
    return router;
}


module.exports = RouterConstructor;
