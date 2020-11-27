import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { AppRouter } from './AppRouter';

// Ensures that controller logic executes
import './controllers/LoginController';
import './controllers/RootController';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));   // Adds req.body property
app.use(cookieSession({ keys: ['testSession'] }));    // Adds req.session property
app.use(AppRouter.getInstance());                     // Retrieves singleton instance of AppRouter

app.listen(3000, () => {
  console.log('Listening on port 3000');
});