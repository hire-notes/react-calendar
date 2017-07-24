import express from 'express';

let router = express.Router();

router.get('/', (req, res) => {
	res.status(200).send(JSON.stringify({hello: 'world'}));
});

export default router;