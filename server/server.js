import express from 'express';
import bodyParser from 'body-parser';
const auth_route= require('./auth-route');

const app = express();
app.use(bodyParser.json());

app.route('/api/login').post(auth_route.loginUser);

const httpServer = app.listen(9000, () => {
    console.log("HTTP REST API Server running at http://localhost:" + httpServer.address().port);
});