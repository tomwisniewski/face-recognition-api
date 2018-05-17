const clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'a0e44bc57d614485b5f46bdb9d1985d7'
});

const handleApiCall = (req, res) => {
	app.models
	.predict("a403429f2ddf4b49b307e318f00e528b", req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('unable to work with api'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('unable to get count'))
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
}