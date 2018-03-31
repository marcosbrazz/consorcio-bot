var consorcio = require('./consorcio.js');
var send = require('gmail-send')({
	user: 'marcos.brazz@gmail.com',
  	pass: 'jqaodenahysxnkch',
  	to: 'marcos.brazz@gmail.com'
});

module.exports = {
    start: function() { 
        console.log("Executing consorcio job!")
        consorcio.verificarContemplacao().then(function(resumo) {
            if(resumo.contemplado) {                
                this.alertarContemplacao(resumo);
                console.log("Contemplacao verificada!")
            }            
        },
        function(err) {
            console.log(err);
            this.alertaErro(err.message);
        });
        console.log("Finished consorcio job!")

    },
    alertarContemplacao: function(resumo) {
        send({subject: 'FUI CONTEMPLADO na centena: ' + resumo.ordemMinhaCentena + ' !!!!',
                    html: "Bilhetes: \n\n" +
                        "Extracao: " + resumo.extracao + "\n" +
                        "Data: " + resumo.dataExtracao + "\n" +
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
                        "<h1>PARABÉNS PRA MIM !!</h1>"});  
    },
    
    alertaErro: function(msg) {
        send({subject: 'Erro no consorcio-bot',	text: msg});
    }
};