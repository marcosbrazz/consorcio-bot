var CronJob = require('cron').CronJob;
var bot = require('./bot.js');

var job = new CronJob({
  cronTime: "00 9 * * *",
  // cronTime: "* * * * * *",
  // cronTime: "13 9,11,16,20,22 * * *",
  onTick: bot.start(),  
  start: true,
  timeZone: "America/Sao_Paulo"
});

job.start();