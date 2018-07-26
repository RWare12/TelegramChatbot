import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
const { TelegramClient } = require('messaging-api-telegram');
const client = TelegramClient.connect('696494774:AAHCl0iDVjrlW9SJKMrBGYH0Wg2derP_UDI');

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	api.post('/sendMessage', (req, res) => {
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
			case 'help.help':
				return res.json({"fulfillmentMessages": [{
					"quickReplies": {
					"title": "Jokes, Cats, and Dogs",
					"quickReplies": ["Joke","Cat","Dog","Push"]
					},
					"platform": "TELEGRAM"
					}]
				});			
				break;
			case 'push.message':
				var ID = req.body.originalDetectIntentRequest.payload.data.message.from.id;
				client.sendMessage(ID, 'Don\'t push so hard.', {
					disable_web_page_preview: true,
					disable_notification: true,
				});
				return res.json({'fulfillmentText':'Are you pushing me because you think my jokes are lame? Well they\'re not. You\'re lame.'});
				break;
		}
	});

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
