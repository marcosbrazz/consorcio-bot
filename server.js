var express = require('express');
var consorcio = require('./consorcio.js');

const PORT = process.env.PORT || 5000

var app = express();

app.get('/check', function(req, res) {
	console.log('Executing consorcio manually');
	consorcio.verificarContemplacao().then(function(resumo) {
		res.send(resumo);
	},
	function(err) {
		res.send(err);
	});
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = app ;
