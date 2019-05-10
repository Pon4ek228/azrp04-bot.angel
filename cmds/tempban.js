const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("`Недостаточно прав для использования.`");

    var user = message.guild.member(message.mentions.users.first());

    if (!user) return message.channel.send("`Используйте: !ban [@упоминание] [time] [reason]`");

    if (user.hasPermission("MANAGE_MESSAGES")) return message.channel.send("`Этот пользователь не может быть забанен!`");

    let reason = args.slice(2).join(" ");
    if(!reason) return message.reply("`, пожалуйста, проверьте правильность ввода!`");

    var tempBanTime = args[1];

    if (ms(tempBanTime)) {

        await message.guild.member(user).ban(reason);

        message.channel.send(`\`Пользователь\` ${user} \`был заблокирован на ${tempBanTime} Администратором\` ${message.author}\`. Причина:\` **${reason}**`);
         try{
             await user.send(`\`Здравствуйте, Вы получили блокировку за нарушения правил на\` **Arizona Chandler** \`на ${tempBanTime}. Причина:\` **${reason}**\`. Выдал:\` ${message.author}\`. Если не согласны с наказанием - напишите жалобу на\` **Администратора**\`. Прошу более не нарушать!\``)
         } catch(e) {
             message.reply(`\`у пользователя\` ${user} \` закрыто ЛС, письмо с информацией о блокировке отправлено не было.\``)
         }
        
        setTimeout(function () {
            
            message.guild.unban(user.id);

            message.channel.send(`\`Пользователь\` ${user} \`- был разблокирован по истечению срока.\``);

        }, ms(tempBanTime));

    } else {
        return message.channel.send("`Неверно указано время!`");
    }

}

module.exports.help = {
    name: "ban"
}
