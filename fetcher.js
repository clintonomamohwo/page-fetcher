const request = require('request');
const fs = require('fs');

const args = process.argv.slice(2);

const fetcherApp = function(url, file, done) {
  request(`${url}`, (error, response, body) => { // URL ERROR
    if (error) {
      console.log('Error: ', error);
      return;
    }

    if (response.statusCode > 299 || response.statusCode < 200) { // URL NON-200 STATUS CODE
      console.log(`There was a ${response.statusCode} status code.`);
      return;
    }

    fs.writeFile(`${file}`, body, (error) => { // write body html to file
      if (error) {
        console.log(error);
        return;
      }
      done(`${file}`); // return file path
    });
  });
};


fetcherApp(args[0], args[1], (file) => {
  fs.stat(file, (error, stats) => {
    if (error) throw error;
    console.log(`Downloaded and saved ${stats.size} bytes to ${file}`);
  });
});