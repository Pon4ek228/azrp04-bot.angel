const Discord = require("discord.js");
const prefix = "!";

module.exports.run = async (bot, message, args) => {


  if(!message.member.hasRole("Гл. Модератор")) return message.reply("`Нет прав для выполнения действия.`");
  if(args[0] == "help"){
    message.reply("Usage: !moderation <user>");
    return;
  }
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("`Используйте: !mute [@упоминание] [срок] [причина] `");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("`Данного пользователя нельзя замутить!`");
  let reason = args.slice(2).join(" ");
  if(!reason) return message.reply("`, пожалуйста, проверье правильность ввода!`");

  let muterole = message.guild.roles.find(`name`, "Модераторы");

 try{
  await tomute.addRole(muterole);
  message.channel.send(`Модератор назначен.`);
} catch(e) {
  message.channel.send(`**Ошибка: ${e.message}**`);
}

  await(tomute.addRole(muterole.id));
//end of module
}

module.exports.help = {
  name: "moderation"
}
