const Discord = require("discord.js");
const prefix = "!";

module.exports.run = async (bot, message, args) => {

   if (!message.member.roles.some(r=>["Ст. Модератор"].includes(r.name)) ) 
    return message.reply("`Нет прав для выполнения действия.`");
  if(args[0] == "help"){
    message.reply("Usage: !ballas <user>");
    return;
  }
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("`Используйте: !ballas [@упоминание]`");
  if(tomute.hasPermission("BAN_MEMBERS")) return message.reply("`Ошибка! Нельзя выдать роль этому пользователю.`");
  if(!tomute) return message.reply("`, пожалуйста, проверье правильность ввода!`");
  
  ["Агент ФБР", "Сотрудник Полиции ЛС", "Сотрудник Полиции СФ", "Сотрудник Полиции ЛВ", "Сотрудник Окружной Полиции", "Сотрудник Правительства", "Сотрудник Центрального банка", "Военнослужащий Армии ЛС", "Военнослужащий Армии СФ", "Сотрудник Тюрьмы", "Сотрудник Больницы ЛС", "Сотрудник Больницы СФ", "Сотрудник Больницы ЛВ", "Сотрудник СМИ СФ", "Сотрудник СМИ ЛС", "Сотрудник СМИ ЛВ", "Сотрудник Автошколы", "Член банды Night Wolfs", "Член банды The Rifa", "Член банды The Ballas", "Член банды Los-Santos Vagos", "Член банды Grove Street", "Член банды Varios Los Aztecas", "Член Русской Мафии", "Член мафии Yakuza", "Член мафии La Cosa Nostra", "Член мафии Warlock MC"].forEach(rolename => {
let removeall = message.guild.roles.find(r => r.name == rolename);
tomute.removeRole(removeall);
  });
  
  let muterole = message.guild.roles.find(r => r.name == "Член банды The Ballas");
    
 try{
  await tomute.addRole(muterole);
  message.channel.send(`\`Пользователю\` ${tomute} \`была выдана роль\` ${muterole} \`. Роли других фракций были сняты.\``);
} catch(e) {
  message.channel.send(`**ERROR 228/1337: ${e.message}**`);
}
  await(tomute.addRole(muterole.id));
  }

module.exports.help = {
  name: "ballas"
}

