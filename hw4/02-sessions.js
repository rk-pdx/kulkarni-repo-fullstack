
const express = require('express');
const session = require('express-session');
const app     = express();
const port    = process.env.PORT || 5001;


app.use(session({secret: 'secret_key'}));


app.get('/', (req, res) => {
  if (req.session.first_time) {
    req.session.routes.push('/');
    res.send(`Navigate to any route.`);
  }
  else {
    req.session.first_time = true;
    req.session.routes = ['/'];
    res.send(`<h1>Welcome to http://localhost:${port}</h1>`);
  }
  res.end();
});


app.get('/*', (req, res) => {
  if (!req.session.routes || req.url === '/favicon.ico') res.redirect('/');
  else {
    res.write(`Currently on route: ${req.url}\nPreviously visited: `);
    req.session.routes.forEach((route) => res.write(`${route} `));
    req.session.routes.push(req.url);
    res.end();
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
