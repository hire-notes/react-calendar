import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
// reference https://github.com/tahnik/react-express-webpack-babel/blob/master/routes/index.js
// for full index.js which includes use of react router and redux to set initial state and server render

let router = express.Router();

router.get('/', (req, res) => {
	res.status(200).send(renderFullPage());
});

function renderFullPage() {
	return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    	<!-- Required meta tags always come first -->
    	<meta charset="utf-8">
    	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    	<meta http-equiv="x-ua-compatible" content="ie=edge">
    	<title>React Router Redux Express</title>
    	<!-- Bootstrap CSS -->
    	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/css/bootstrap.min.css" integrity="sha384-y3tfxAZXuh4HwSYylfB+J125MxIs6mR5FOHamPBG064zB+AFeWH94NdvaCBm8qnd" crossorigin="anonymous">
    	<link rel="stylesheet" href="../stylesheets/main.css">
    </head>
    <body>
    	<div id="app"></div>
    	<script src="../bin/app.bundle.js"></script>
    </body>
    </html>
    `
}

export default router;