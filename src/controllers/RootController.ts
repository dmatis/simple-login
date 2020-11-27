import { get, controller, use } from "./decorators";
import { Request, Response, NextFunction } from 'express';

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403).send('Not permitted');
}

@controller('')
class RootController {
  @get('/')
  getRoot(req: Request, res: Response) {
    if (req.session && req.session.loggedIn) {
      res.send(`
        <div>
          <div>You are logged in</div>
          <a href="/auth/logout">Logout</a>
          <br>
          <a href="/protected">Protected Route</a>
        </div>
      `);
    } else {
      res.send(`
      <div>
        <div>You are not logged in</div>
        <a href="/auth/login">Login</a>
        <br>
        <a href="/protected">Protected Route</a>
      </div>
    `);
    }
  }

  // requireAuth becomes a gatekeeper, preventing the remaining handlers from executing if a user is not logged in.
  // This way, only a logged in user will view the content returned by the /protected route.
  @get('/protected')
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.send(`
      <div>
        <div>Welcome to protected route, logged in user</div>
        <a href="auth/logout">Logout</a>
      </div>
    `);
  }
}