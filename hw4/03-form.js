const express = require('express');
const app     = express();
const port    = process.env.PORT || 5001;

// Use middleware static() to serve all static files in the given folder
app.use(express.static('public'));


// Use middleware urlencoded() to parse an incoming request with a urlencoded payload and return an object
app.use(express.urlencoded({ extended: false }));


app.post('/submit', (req, res) => {
  let newsletter = !!req.body['newsletter'] ? 'Yes, I would like the newsletter' : 'No, thank you';
  res.send(`<div>
              Name: ${req.body.name}<br>
              Email: ${req.body.email}<br>
              Comments: ${req.body.comments}<br>
              Newsletter: ${newsletter}
            </div>`);
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
