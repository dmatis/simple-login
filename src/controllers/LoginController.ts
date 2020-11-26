import { Request, Response } from 'express';
import { get, controller } from './decorators'

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