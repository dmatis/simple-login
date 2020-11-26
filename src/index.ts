import express from 'express';
import { router } from './routes/loginRoutes';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { router as controllerRouter } from './controllers/decorators/controller';

import './controllers/LoginController';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));   // Adds req.body property
app.use(cookieSession({ keys: ['testSession'] }));    // Adds req.session property
app.use(router);
app.use(controllerRouter);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});