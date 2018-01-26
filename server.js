var schedule = require('node-schedule');
const fs = require('fs');
const cheerio = require('cheerio');
var express = require('express'),


var send = require('gmail-send')({
	user: 'marcos.brazz@gmail.com',
  	pass: 'jqaodenahysxnkch',
  	to: 'marcos.brazz@gmail.com'
});

var job = schedule.scheduleJob('00 9 * * *', function() {
  console.log('Executing consorcio-bot by job');
  consorciobot.start();
});

var app = express();

app.get('/check', function(req, res) {
	console.log('Executing consorcio-bot manually');
	consorciobot.start();
}) ;



var consorciobot = {

	resumo: {
		bilhetes : []
	},

	email = {},

	start: function() {
		fs.readFile('federal', 'utf-8', (err, data) => {
			if(err) throw err;
			var $ = cheerio.load(data);
			var centenas = new Array();
			var centena = 0; 
			var centenaSorteada = 0;
			if($('.resultado-loteria table tbody tr td:nth-child(2)').length == 0) {
				alertaErro('A query para obter os bilhetes não retornou nada !');
				return;
			}
			$('.resultado-loteria table tbody tr td:nth-child(2)').each((index, td) => {
				var bilhete = $(td).text();
				resumo.bilhetes.push(bilhete);
				console.log(bilhete + '\n');
		    	centenas.push(bilhete.substr(2,4));
		    	centenas.push(bilhete.substr(1,3));    
				var pos = bilhete.search("162");
				if(pos == 2) {
			      centena = i*2 + 1;
				}
				else if(pos == 1){
		 			centena = i*2 + 2;
				}
				if(centena > 0 && centenaSorteada == 0) {
		      		centenaSorteada = centena;
				}
			});	
			if(centenaSorteada > 0) {
				resumo.centenas = centenas;
				resumo.centenaSorteada = centenaSorteada;
		   		alertarContemplacao();
			}
			
		});
	},

	alertarContemplacao: function() {	
	  	email.subject = 'FUI CONTEMPLADO na centena: ' + resumo.centenaSorteada + ' !!!!';
		email.html = "Bilhetes: \n\n" +
		    "<table border='1'>" +
		      "<tr>" + 
		        "<td>1. premio: " + resumo.bilhetes[0] + "</td>" + 
		        "<td>1. centena: " + resumo.centenas[0] + "</td>" + 
		        "<td>2. centena: " + resumo.centenas[1] + "</td>" +
		      "</tr>" +
		      "<tr>" + 
		        "<td>2. premio: " + resumo.bilhetes[1] + "</td>" + 
		        "<td>3. centena: " + resumo.centenas[2] + "</td>" + 
		        "<td>4. centena: " + resumo.centenas[3] + "</td>" +
		      "</tr>" +
		      "<tr>" + 
		        "<td>3. premio: " + resumo.bilhetes[2] + "</td>" + 
		        "<td>5. centena: " + resumo.centenas[4] + "</td>" + 
		        "<td>6. centena: " + resumo.centenas[5] + "</td>" +
		      "</tr>" +
		      "<tr>" + 
		        "<td>4. premio: " + resumo.bilhetes[3] + "</td>" + 
		        "<td>7. centena: " + resumo.centenas[6] + "</td>" + 
		        "<td>8. centena: " + resumo.centenas[7] + "</td>" +
		      "</tr>" +
		      "<tr>" + 
		        "<td>5. premio: " + resumo.bilhetes[4] + "</td>" + 
		        "<td>9. centena: " + resumo.centenas[8] + "</td>" + 
		        "<td>10. centena: " + resumo.centenas[9] + "</td>" +
		      "</tr>" +
		    "</table>" + 
		    "<h1>PARABÉNS PRA MIM !!</h1>";  

	  	send(email);
	},

	alertaErro: function(msg) {
		email.subject = 'Erro no consorcio-bot';
		email.text = msg;
		send(email);
	}


};
