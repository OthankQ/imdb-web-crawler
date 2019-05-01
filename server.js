const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const app = express();

app.get('/scrape', (req, res) => {
  // url we will scrape from
  url = 'https://www.imdb.com/title/tt4154796/?ref_=shtt_ov_tt';

  request(url, (error, response, html) => {
    if (!error) {
      var $ = cheerio.load(html);
      var title, release, rating;
      var json = { title: '', release: '', rating: '' };

      $('.title_wrapper').filter(function() {
        const data = $(this);
        title = data
          .children()
          .first()
          .text()
          .trim();
        release = data
          .children()
          .last()
          .children()
          .last()
          .text()
          .trim();

        json.title = title;
        json.release = release;
      });

      $('.ratingValue').filter(function() {
        const data = $(this);
        rating = data.text().trim();

        json.rating = rating;
      });
    }

    fs.writeFile('output.json', JSON.stringify(json, null, 4), err => {
      if (!err) {
        console.log('File successfully written!');
      }
    });

    res.send('Check your console!');
  });
});

app.listen('8000');
console.log('server running on port 8000');

exports = module.exports = app;
