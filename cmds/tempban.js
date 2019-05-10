const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    // !tempban gebruiker reden tijd

    // Nakijken als je wel het command mag gebruiken.
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("`Недостаточно прав для использования.`");

    // User opvragen en nakijken als je wel een user meegeeft.
    var user = message.guild.member(message.mentions.users.first());

    if (!user) return message.channel.send("`Используйте: !ban [@упоминание] [time] [reason]`");

    // Nakijken als je de gebruiker wel kunt bannen.
    if (user.hasPermission("MANAGE_MESSAGES")) return message.channel.send("`Этот пользователь не может быть забанен!`");

    let reason = args.slice(2).join(" ");
    if(!reason) return message.reply("`, пожалуйста, укажите причину.`");

    var tempBanTime = args[1];

    if (ms(tempBanTime)) {

        await message.guild.member(user).ban(reason);

        message.channel.send(`\`Пользователь\` ${user} \`был заблокирован на ${tempBanTime} модератором\` ${message.author}\`. Причина:\` **${reason}**`);
         try{
             await user.send(`\`Здравствуйте, Вы получили блокировку за нарушения правил на\` **Arizona Chandler** \`на ${tempBanTime}. Причина:\` **${reason}**\`. Выдал:\` ${message.author}\`. Если не согласны с наказанием - напишите жалобу на\` **Администратора**\`. Прошу более не нарушать!\``)
         } catch(e) {
             message.reply(`\`, бан был успешно выдан игроку ${user} на ${tempBanTime}, но у пользователя закрыто ЛС. Просьба сообщить ему причину бана в общем чате.\``)
         }

        // We gaan een timeout zetten voor terug te unbannen.
        setTimeout(function () {
            
            // Hier moet je het ID meegeven om te kunnen unbannen. (Moet zo volgens discord.js).
            message.guild.unban(user.id);

            message.channel.send(`${user} \`был разблокирован по истечению срока.\``);

        }, ms(tempBanTime));

    } else {
        return message.channel.send("`Неверно указано время!`");
    }

}

module.exports.help = {
    name: "ban"
}
