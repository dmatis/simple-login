import { Request, Response, NextFunction } from 'express';
import { get, controller, use, bodyValidator, post } from './decorators'

function logger(req: Request, res: Response, next: NextFunction) {
  console.log('*** Logger middleware was called ***');
  next();
}

@controller('/auth')
class LoginController {
  @get('/login')
  @use(logger)
  getLogin(req: Request, res: Response): void {
    res.send(`
      <form method="POST">
        <div>
          <label>Email
            <input name="email" />
          </label>
        </div>
        <div>
          <label>Password
            <input name="password" type="password" />
          </label>
        </div>
        <button>Submit</button>
      </form>
    `)
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    if (email === '1@test.com' && password === 'password') {
      req.session = { loggedIn: true };
      res.redirect('/');
    } else {
      res.send('Invalid email or password');
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response) {
  req.session = null;
    res.redirect('/');
  }
}