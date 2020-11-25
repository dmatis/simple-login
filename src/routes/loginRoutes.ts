import { Router, Request, Response, NextFunction } from 'express';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined }
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403).send('Not permitted');
}

const router = Router();

router.get('/login', (req: Request, res: Response) => {
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
});

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;

  if (email && password && email === '1@test.com' && password === 'password') {
    req.session = { loggedIn: true };
    res.redirect('/');
  } else {
    res.send('Invalid email or password');
  }
});

router.get('/', (req: Request, res: Response) => {
  if (req.session && req.session.loggedIn) {
    res.send(`
      <div>
        <div>You are logged in</div>
        <a href="/logout">Logout</a>
        <br>
        <a href="/protected">Protected Route</a>
      </div>
    `);
  } else {
    res.send(`
    <div>
      <div>You are not logged in</div>
      <a href="/login">Login</a>
      <br>
      <a href="/protected">Protected Route</a>
    </div>
  `);
  }
})

router.get('/logout', (req: Request, res: Response) => {
  req.session = null;
  res.redirect('/');
})

// requireAuth becomes a gatekeeper, preventing the remaining handlers from executing if a user is not logged in.
// This way, only a logged in user will view the content returned by the /protected route.
router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send(`
    <div>
      <div>Welcome to protected route, logged in user</div>
      <a href="/logout">Logout</a>
    </div>
  `);
})

export { router }