const http = require(`http`);
const fs = require(`fs`);
const port = process.env.PORT || 5001;


const server = http.createServer((request, response) => {
  if (request.url === '/') {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('<h1>Main Page</h1>');
    response.write('<a href="/form">form</a>');
    response.end();
  }

  else if (request.url === '/form') {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('<h1>Form Page</h1>');
    fs.createReadStream('form.html').pipe(response);
  }

  else if (request.url === '/submit') {
    let body = '';
    let a = [];

    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('<h1>Submission Page</h1>');
    
    request.on(`data`, chunk => body += chunk);
    request.on(`end`, () => {
      body.split(`&`).forEach((x) => a.push(decodeURIComponent(x.split(`=`)[1])))

      response.write(
        `<div>Username: ${a[0]}</div><br>
        <div>Email: ${a[1]}</div><br>`
      );

      response.end();
    })
  }
})


server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
