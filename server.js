const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const app = express();

app.get('/scrape', (req, res) => {
  // url we will scrape from
  const url = 'https://www.imdb.com/showtimes/title/tt4154796?ref_=sh_ov_tt';

  request(url, (error, response, html) => {
    if (!error) {
      const $ = cheerio.load(html);
      const title, release, rating;
      const json = { title: "", release: "", rating: "" }
    }
  });
});

app.listen('8000');
console.log('server running on port 8000');

exports = module.exports = app;
