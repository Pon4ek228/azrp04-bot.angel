const Discord = require("discord.js");
const ms = require("ms");
const prefix = "!";

module.exports.run = async (bot, message, args) => {


  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("`Нет прав для выполнения действия.`");
  if(args[0] == "help"){
    message.reply("Usage: !mute <user> <1s/m/h/d>");
    return;
  }
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("`Используйте: !mute [@упоминание] [срок] [причина] `");
  if(tomute.hasPermission("MANAGE_GUILD")) return message.reply("`Данного пользователя нельзя мутить!`");
  let reason = args.slice(2).join(" ");
  if(!reason) return message.reply("`, пожалуйста, укажите причину.`");

  let muterole = message.guild.roles.find(`name`, "muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("`Вы не указали время.`");



 try{
  await tomute.addRole(muterole);
  message.channel.send(`**Модератор ${message.author} успешно выдал мут игроку ${tomute} на ${mutetime}. Причина: ${reason}.**`);
} catch(e) {
  message.channel.send(`**Ошибка: ${e.message}**`);
}

  try{
    await tomute.send(`Здравствуйте, Вы получили **бан чата** за нарушения правил на **Arizona Chandler** на ${mutetime}. Причина: ${reason}. Выдал: ${message.author} Если не согласны с наказанием - напишите жалобу на **модератора**. Прошу более не нарушать!`)
  }catch(e){
    message.reply(`**, мут был успешно выдан игроку ${tomute} на ${mutetime}, но у пользователя закрыто ЛС. Просьба сообщить ему причину мута в общем чате.**`)
  }

  let muteembed = new Discord.RichEmbed()
  .setDescription(`Мут выдал ${message.author}`)
  .setColor("#00edff")
  .addField("Пользователь", tomute)
  .addField("Время", message.createdAt)
  .addField("Срок", mutetime)
  .addField("Причина", reason);

  let incidentschannel = message.guild.channels.find(`name`, "logs");
  if(!incidentschannel) return message.reply("`Не создан канал для выведения логов.`");
  incidentschannel.send(muteembed);

  await(tomute.addRole(muterole.id));

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`**У <@${tomute.id}> мут был снят по окончанию срока.**`);
  }, ms(mutetime));


//end of module
}

module.exports.help = {
  name: "mute"
}
