const Discord = require("discord.js");
const prefix = "!";

module.exports.run = async (bot, message, args) => {


  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("`Нет прав для выполнения действия.`");
  if(args[0] == "help"){
    message.reply("Usage: !ballas <user>");
    return;
  }
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("`Используйте: !ballas [@упоминание]`");
  if(tomute.hasPermission("BAN_MEMBERS")) return message.reply("`Данного пользователя нельзя назначить!`");
  if(!tomute) return message.reply("`, пожалуйста, проверье правильность ввода!`");
  
  ["Член банды Night Wolfs", "Сотрудник Автошколы"].forEach(rolename => {
let role = message.guild.roles.find(r => r.name == rolename);
tomute.removeRole(role);
});

  let muterole = message.guild.roles.find(`name`, "Член банды The Ballas", "Член банды Night Wolfs");

 try{
  await tomute.addRole(muterole);
  message.channel.send(`\`Пользователь\` ${tomute} \`назначен модератором.\``);
} catch(e) {
  message.channel.send(`**Жууук, ну тут типа ошибка да: ${e.message}**`);
}

  await(tomute.addRole(muterole.id));
}

module.exports.help = {
  name: "ballas"
}
