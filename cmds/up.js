const Discord = require("discord.js");
const prefix = "!";

module.exports.run = async (bot, message, args) => {


  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("`Нет прав для выполнения действия.`");
  if(args[0] == "help"){
    message.reply("Usage: !up <user>");
    return;
  }
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("`Используйте: !up [@упоминание]`");
  if(tomute.hasPermission("BAN_MEMBERS")) return message.reply("`Данного пользователя нельзя повысить!`");
  if(!tomute) return message.reply("`, пожалуйста, проверье правильность ввода!`");

  let muterole = message.guild.roles.find(`name`, "Ст. Модератор");

 try{
  await tomute.addRole(muterole);
  message.channel.send(`\`Модератор\` ${tomute} \`повышен до Старшего Модератора.\``);
} catch(e) {
  message.channel.send(`**Ошибка: ${e.message}**`);
}

  await(tomute.addRole(muterole.id));
}

module.exports.help = {
  name: "up"
}
