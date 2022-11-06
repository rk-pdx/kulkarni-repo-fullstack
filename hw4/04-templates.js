const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5001;
const url = 'https://restcountries.com/v3.1/all';


app.set('views', __dirname + '/views');
app.set('view engine', 'pug');


let groupBy = function(data, key) {
  return data.reduce(function(storage, item) {
    let group = item[key];

    storage[group] = storage[group] || [];
    storage[group] = Number(storage[group]) + item.population;

    return storage; 
  }, {});
};


const instructions = [
  { 'title'     : '/capitals',
    'params'    : 'capital',
    'command'   : '`${country.name.official} - ${country.capital}`',
  },
  {
    'title'     : '/populous',
    'params'    : 'population',
    'command'   : 'if (country.population >= 50000000) `${country.name.official} - ${country.population}`',
  },
  {
    'title'     : '/regions',
    'params'    : 'region',
    'command'   : 'groupBy(response.data, "region")'
  }
];


const extractData = (instruction) => {
  
  return async (req, res, next) => {
    let dataToRender = [];

    await axios.get(url).then((response) => {
      if (response.data) {
        if (instruction.title === '/regions') {
          dataToRender.push(eval(instruction.command));
        }
        else {
          response.data.forEach((country) => {
            if (country.capital)
              dataToRender.push(eval(instruction.command));
          });
        }
      }
    }).catch((error) => {
      console.log(`The GET request to Axios (url: ${url}) failed; error: ${error}`);
    });
    
    res.locals.dataToRender = dataToRender.filter((element) => element !== undefined).sort();
    
    next();
  }

};


app.get('/', (req, res) => {
  res.render('index', {
    heading: 'Countries of the World',
    main: 'Welcome to this application. Using the REST Countries API, we will be showing the countries and capitals of the world, the most populous countries in the world, and the number of countries in each region of the world',
  });
});


app.get(['/capitals', '/populous', '/regions'], (req, res, next) => {
  let instruction = (instructions.filter((instruction) => instruction.title === req.url))[0];

  const extractDataInstance = extractData(instruction);
  extractDataInstance(req, res, next);
});


app.get('/capitals', (req, res) => {
  res.render('page', {
    heading: 'Countries and Capitals',
    results: res.locals.dataToRender,
  });
});


app.get('/populous', (req, res) => {
  res.render('page', {
    heading: 'Most Populous Countries',
    results: res.locals.dataToRender,
  });
});


app.get('/regions', (req, res) => {
  let dataToRender = Object.entries(res.locals.dataToRender[0]);

  for (let i = 0; i < dataToRender.length; i++) {
    dataToRender[i] = dataToRender[i].toString().replace(/,/g, '-')
  }

  res.render('page', {
    heading: 'Regions of the World',
    results: dataToRender,
  });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
