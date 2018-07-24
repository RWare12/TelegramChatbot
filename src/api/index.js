import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
var builder = require('botbuilder');
const fetch = require('node-fetch');

// connection to chat bot. Requires MICROSOFT_APP_ID and MICROSOFT_APP_PASSWORD. 
var connector = new builder.ChatConnector({
	appId: '4b21f634-f354-4052-bd20-197d723b147f',
	appPassword: 'kREBLB54471*[]pkhqtwTB;',
	});
var bot = new builder.UniversalBot(connector);


export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	// callback url for 'RalphisBot'
	api.post('/telegrambot', (req, res) => {
		var body = req.body;
		console.log(body);
	});

	return api;
}
