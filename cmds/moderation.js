const Discord = require("discord.js");
const prefix = "!";

module.exports.run = async (bot, message, args) => {


  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("`Нет прав для выполнения действия.`");
  if(args[0] == "help"){
    message.reply("Usage: !moderation <user>");
    return;
  }
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("`Используйте: !moderation [@упоминание]`");
  if(tomute.hasPermission("BAN_MEMBERS")) return message.reply("`Данного пользователя нельзя назначить!`");
  if(!tomute) return message.reply("`, пожалуйста, проверье правильность ввода!`");

  let muterole = message.guild.roles.find(`name`, "Модераторы");

 try{
  await tomute.addRole(muterole);
  message.channel.send(`\`Пользователь\` ${tomute} \`назначен модератором.\``);
   const channel = message.client.channels.find('name', ✅chat)
channel.send(qqqqqqqqqqqqqqqqq)
} catch(e) {
  message.channel.send(`**Жууук, ну тут типа ошибка да: ${e.message}**`);
}

  await(tomute.addRole(muterole.id));
}

module.exports.help = {
  name: "moderation"
}
