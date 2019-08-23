const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args, con, cfg) => {

	if (!message.member.roles.some(r=>["Ст. Модератор", "Модераторы", "Гл. Модератор", "Хелпер", "Администратор 4 уровня", "Администратор 3 уровня", "Куратор", "Продвинутый пользователь"].includes(r.name)) ) 
    return message.reply("`Нет прав для выполнения действия.`");
	let target = message.mentions.members.first() || message.guild.members.get(args[0]);
	if(!target) return message.reply("`Используйте: !unmute [@упоминание]`");

	let role = message.guild.roles.find(r => r.name == 'Muted ☊' );
	if(!role || !target.roles.has(role.id)) return message.channel.send("`Этот пользователь не имеет бана чата.`");

	try {
		await target.removeRole(role);
		message.channel.send(`\`Пользователю\` ${target} \`был снят бан чата модератором\` ${message.author}\`.\``);
	} catch(e) {
		message.channel.send(`**Ошибка: ${e.message}**`);
	}

	let unmuteembed = new Discord.RichEmbed()
	.setDescription(`Мут снял ${message.author}`)
	.setColor("#00edff")
	.addField("Пользователь", target)
	.addField("Время", message.createdAt)
  
	let incidentschannel = message.guild.channels.find(`name`, "logs");
	if(!incidentschannel) return message.reply("`Не создан канал для выведения логов.`");
	incidentschannel.send(unmuteembed);
// end
}

module.exports.help = {
	name: "unmute"
}
