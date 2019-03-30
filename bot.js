const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const fs = require('fs')
let config = require('./botconfig.json');
let token = config.token;
let prefix = config.prefix;
let serverid = '555334013255155712'

fs.readdir('./cmds/',(err,files)=>{
  if(err) console.log(err);
  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if(jsfiles.length <=0) console.log("Нет комманд для загрузки!");
  console.log(`Загружено ${jsfiles.length} комманд`);
  jsfiles.forEach((f,i) =>{
    let props = require(`./cmds/${f}`);
    console.log(`${i+1}.${f} Загружен!`);
    bot.commands.set(props.help.name,props);
  })
});

bot.on('ready', () => {
  console.log(`Запустился бот ${bot.user.username}`);
  bot.generateInvite(["ADMINISTRATOR"]).then(link =>{
    console.log(link);
  })
});


bot.on('message', msg => {

  if(msg.content.startsWith("Ацтек")) {
  if(msg.member.permissions.has('MANAGE_ROLES')){
  let role = msg.guild.roles.find(`name`, `Muted`)
  let user = msg.mentions.members.first();
  user.addRole(role.id);
  msg.reply(`` );
  console.log(`Пользователю была выдана роль `)
  } else {
  msg.reply(`Вы не имеете право выдавать роли!`);
  console.log(`Пользователь не имеет право выдавать роли!`);
  }
  }
  });

};

bot.login(process.env.token); // Авторизация бота
bot.on('ready', () => {
    console.log("Бот был успешно запущен!");
    bot.user.setActivity('за сервером', { type: 'WATCHING' }); // В активности будет: 'смотрит за сервером'
    bot.user.setPresence({ status: 'dnd' }); // Статус будет 'Не беспокоить', статусы: 'online', 'idle', 'dnd', 'invisible'
    timer();
    get_support();
});


bot.on('message', async message => {
  if(message.author.bot) return;
  if(message.channel.type == "dm") return;
  let user = message.author.username;
  let userid = message.author.id;
  let messageArray = message.content.split(" ");
  let command = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);
  if(!message.content.startsWith(prefix)) return;
  let cmd = bot.commands.get(command.slice(prefix.length));
  if(cmd) cmd.run(bot,message,args);
});
