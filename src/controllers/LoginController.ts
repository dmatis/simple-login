import { Router, Request, Response, NextFunction } from 'express';
import { get } from './decorators/routes'
import { controller } from '../controllers/decorators/controller';

@controller('/auth')
class LoginController {
  @get('/login')
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
  };
}