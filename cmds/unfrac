const Discord = require("discord.js");
const prefix = "!";

module.exports.run = async (bot, message, args) => {

   if (!message.member.roles.some(r=>["Гл. Модератор", "Следящий за Discord", "Куратор", "Зам. Тех. Администратора Discord", "Тех. Администратор Discord"].includes(r.name)) ) 
    return message.reply("`Нет прав для выполнения действия.`");
 let target = message.mentions.members.first() || message.guild.members.get(args[0]);
	if(!target) return message.reply("`Используйте: !unfrac [@упоминание]`");
  
  ["Агент ФБР", "Сотрудник Полиции ЛС", "Сотрудник Полиции СФ", "Сотрудник Полиции ЛВ", "Сотрудник Окружной Полиции", "Сотрудник Правительства", "Сотрудник Центрального банка", "Военнослужащий Армии ЛС", "Военнослужащий Армии СФ", "Сотрудник Тюрьмы", "Сотрудник Больницы ЛС", "Сотрудник Больницы СФ", "Сотрудник Больницы ЛВ", "Сотрудник СМИ СФ", "Сотрудник СМИ ЛС", "Сотрудник СМИ ЛВ", "Сотрудник Автошколы", "Член банды Night Wolfs", "Член банды The Rifa", "Член банды Los-Santos Vagos", "Член банды Grove Street", "Член банды Varios Los Aztecas", "Член банды The Ballas", "Член Русской Мафии", "Член мафии Yakuza", "Член мафии La Cosa Nostra", "Член мафии Warlock MC"].forEach(rolename => {
let removeall = message.guild.roles.find(r => r.name == rolename);
tomute.removeRole(removeall);
  });

	try {
		message.channel.send(`\`Пользователю\` ${target} \`были сняты все роли фракций.\``);
	} catch(e) {
		message.channel.send(`**Ошибка: ${e.message}**`);
	}
}
module.exports.help = {
  name: "unfrac"
}
