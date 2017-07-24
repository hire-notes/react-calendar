import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import router from './routes/index';

let app = express();

app.use('/', express.static('./dist'));
//app.use('/stylesheets', express.static('./public/stylesheets'));


app.use('/api/', router);
//app.use('/view/*', router);

app.listen(3000, function () {
	console.log('Hello World listening on port 3000!');
});