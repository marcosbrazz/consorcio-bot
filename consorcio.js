var request = require('request');
const $ = require('cheerio');

var exports = module.exports = {};

exports.verificarContemplacao = function() {
	return new Promise(function (resolve, reject) {

		var resumo = {
			bilhetes : []
		};		
			
		request({			
			url: 'http://loterias.caixa.gov.br/wps/portal/!ut/p/a1/04_Sj9CPykssy0xPLMnMz0vMAfGjzOLNDH0MPAzcDbz8vTxNDRy9_Y2NQ13CDA0MzIAKIoEKnN0dPUzMfQwMDEwsjAw8XZw8XMwtfQ0MPM2I02-AAzgaENIfrh-FqsQ9wBmoxN_FydLAGAgNTKEK8DkRrACPGwpyQyMMMj0VAYe29yM!/dl5/d5/L2dBISEvZ0FBIS9nQSEh/pw/Z7_61L0H0G0J0VSC0AC4GLFAD20G0/res/id=buscaResultado/c=cacheLevelPage/=/?timestampAjax=1517163939153',
			jar: true
		}, 
		(error, response, body) => {
			var resultado = JSON.parse(body);
			if(error) {
				console.log("ERROR: " + error.message);
				// alertaErro(error.message);
				reject(error);
			}
			if(response.statusCode != 200) {
				error = new Error('Request Failed.\n' +
											`Status Code: ${statusCode}`);
					console.error(error.message);
					// alertaErro(error.message);
					reject(error);
			}
			if(resultado.mensagens) {
				error = new Error(resultado.mensagens[0]);
					console.error(error.message);
					// alertaErro(error.message);
					reject(error);
			}
				
			var centenas = new Array();
			var centena = 0; 
			var ordemMinhaCentena = -1;

			$([
				resultado.premios[0].premio1,
				resultado.premios[0].premio2,
				resultado.premios[0].premio3,
				resultado.premios[0].premio4,
				resultado.premios[0].premio5,

			]).each((index, premio) => {				
				resumo.bilhetes.push(premio);
				// console.log('Bilhete: ' + premio + '\n');
					centenas.push(premio.substr(2,4));
					centenas.push(premio.substr(1,3));    
				var pos = premio.search("162");
				if(pos == 2) {
						centena = i*2 + 1;
				}
				else if(pos == 1){
						centena = i*2 + 2;
				}
				if(centena > 0 && ordemMinhaCentena == -1) {
							ordemMinhaCentena = centena;
				}
			});	
			resumo.centenas = centenas;
			resumo.centenaSorteada = ordemMinhaCentena;
			resumo.extracao = resultado.premios[0].extracao;
			resumo.dataExtracao = resultado.premios[0].dataExtracao;
			if(ordemMinhaCentena > -1) {				
				resumo.contemplado = true;
				//  alertarContemplacao();
			}
			else {
				resumo.contemplado = false;
			}
			resolve(resumo);	
		});
	});
	
};

