import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	api.post('/telegrambot', (req, res) => {
		switch (req.body.queryResult.action) {
			case 'cat.get':
				return res.json({'fulfillmentMessages': [
					{
						'card': {
							'title': 'Cabbage Cade',
							'subtitle': 'all your base are belong to us',
							'imageUri': 'https://i.pinimg.com/originals/aa/e3/9a/aae39a3a843c2867d5743b759069e560.jpg'
						},
						'platform': 'TELEGRAM'
					}
				]});
				break;
			case 'dog.get':
				return res.json({'fulfillmentMessages': [
					{
						'card': {
							'title': 'Frisbee Doge',
							'subtitle': 'so sad',
							'imageUri': 'http://i.imgur.com/7bCZzdm.png'
						},
						'platform': 'TELEGRAM'
					}
				]});
				break;
			case 'test':
				return res.json({"fulfillmentMessages": [{
					"quickReplies": {
					"title": "Jokes, Cats, and Dogs",
					"quickReplies": ["Joke","Cat","Dog"]
					},
					"platform": "TELEGRAM"
					}]
				});			
				break;
		}
	});

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
