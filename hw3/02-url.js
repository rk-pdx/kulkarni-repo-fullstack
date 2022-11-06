const http = require(`http`);
const fs = require(`fs`);
const port = process.env.PORT || 5001;

const server = http.createServer((req, res) => {
  const routes = [
    '/attributes?hello=world&lorem=ipsum',
    '/items?first=1&second=2&third=3&fourth=4',
    '/characters?spongebob=squarepants&patrick=star&sandy=cheeks',
  ];

  // use the URL interface to work with URLs
  // source: https://developer.mozilla.org/en-US/docs/Web/API/URL
  let url = new URL(req.url, `http://${req.headers.host}`);

  let getRoutes = () => {
    let result = '';

    routes.forEach(
      (elem) => (result += `<li><a href="${elem}">${elem}</a></li>`)
    );

    return result;
  };

  if (req.url === '/') {
    let routeResults = getRoutes();

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>Exercise 02</h1>`);

    res.write(`<ul> ${routeResults} </ul>`);
  }
  // Add your code here
  else {
    let x = url.toString().split(`/`)[3].split(`?`)[1].split(`&`);
    
    x.forEach((element, index, x) => {
      x[index] = element.split(`=`);
    });
   
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<table border="1"');

    for (let i = 0; i < x.length; i++) {
      res.write(`<tr><td>${x[i][0]}</td><td>${x[i][1]}</td></tr>`);
    }
    
    res.write('</table>');
   }

  res.end();
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
