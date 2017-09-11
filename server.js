const app = require('./index');

app.listen(3000, (error) => {
  if (error) {
    console.log('Unable to listen to connections', error);
  }

  console.log('express is listening at http://localhost:3000');
});