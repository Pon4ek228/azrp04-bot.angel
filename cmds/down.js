const Discord = require("discord.js");

module.exports.run = async (bot, message, args, con, cfg) => {

	if (!message.member.roles.some(r=>["Гл. Модератор", "Куратор", "Тех. Администратор Discord", "Зам. Тех. Администратора Discord"].includes(r.name)) ) 
    return message.reply("`Нет прав для выполнения действия.`");
	let target = message.mentions.members.first() || message.guild.members.get(args[0]);
	if(!target) return message.reply("`Используйте: !down [@упоминание]`");

	let role = message.guild.roles.find(r => r.name == 'Ст. Модератор' );
	if(!role || !target.roles.has(role.id)) return message.channel.send("`Этот пользователь не является Ст. Модератором`");

	try {
		await target.removeRole(role);
		message.channel.send(`\`Старший Модератор\` ${target} \`понижен до Модератора\``);
		const channel = message.client.channels.find('name', "✅chat");
channel.send(`\`Главный Модератор\` ${message.author} \`понизил\` ${target} \`до модератора.\``);
	} catch(e) {
		message.channel.send(`**Ошибка: ${e.message}**`);
	}
}

module.exports.help = {
	name: "down"
}
