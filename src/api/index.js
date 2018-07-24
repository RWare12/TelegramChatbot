import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
//var builder = require('botbuilder');
//const fetch = require('node-fetch');

// connection to chat bot. Requires MICROSOFT_APP_ID and MICROSOFT_APP_PASSWORD. 
// var connector = new builder.ChatConnector({
// 	appId: '4b21f634-f354-4052-bd20-197d723b147f',
// 	appPassword: 'kREBLB54471*[]pkhqtwTB;',
// 	});
// var bot = new builder.UniversalBot(connector);


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
		}
	});

	return api;
}
