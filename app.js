var express = require('express'),
    app = express();

app.use('/app', express.static(__dirname + '/public/'));
console.log("dirname:",__dirname);

app.get('/newpage', function(req, res){
  res.render('anotherpage', {
    title: 'Home'
  });
});

app.listen(3000);