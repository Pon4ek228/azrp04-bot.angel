const Discord = require("discord.js");

module.exports.run = async (bot, message, args, con, cfg) => {

	let target = message.mentions.members.first() || message.guild.members.get(args[0]);
	if(!target) return message.reply("`Используйте: !unmoderation [@упоминание]`");

	let role = message.guild.roles.find(r => r.name == 'Модераторы' );
	if(!role || !target.roles.has(role.id)) return message.channel.send("`Этот пользователь не является модератором`");

	try {
		await target.removeRole(role);
		message.channel.send(`\`Пользователь\` ${target} \`был снят с поста модератора.\``);
		const channel = message.client.channels.find('name', "✅chat");
channel.send(`\`Главный Модератор\` ${message.author} \`снял\` ${target} \`с поста Модератора.\``);
	} catch(e) {
		message.channel.send(`**Ошибка: ${e.message}**`);
	}
}

module.exports.help = {
	name: "unmoderation"
}
