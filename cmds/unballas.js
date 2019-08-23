const Discord = require("discord.js");
const prefix = "!";

module.exports.run = async (bot, message, args) => {

   if (!message.member.roles.some(r=>["Лидер банды The Ballas", "Зам. Лидера банды The Ballas"].includes(r.name)) ) 
    return message.reply("`Нет прав для выполнения действия.`");
 let target = message.mentions.members.first() || message.guild.members.get(args[0]);
	if(!target) return message.reply("`Используйте: !unballas [@упоминание]`");
  
 	let role = message.guild.roles.find(r => r.name == 'Член банды The Ballas' );
	if(!role || !target.roles.has(role.id)) return message.channel.send("\`Данный пользователь не имеет роли\` ${role}\`.\`");

	try {
		await target.removeRole(role);
		message.channel.send(`\`Пользователю\` ${target} \`была снята роль\` ${role}\`.\``);
	} catch(e) {
		message.channel.send(`**Ошибка: ${e.message}**`);
	}
}
module.exports.help = {
  name: "unballas"
}
