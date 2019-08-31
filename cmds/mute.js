const Discord = require("discord.js");
const ms = require("ms");
const prefix = "!";

module.exports.run = async (bot, message, args) => {


 if (!message.member.roles.some(r=>["Ст. Модератор", "Модераторы", "Гл. Модератор", "Хелпер", "Администратор 4 уровня", "Администратор 3 уровня", "Куратор", "Продвинутый пользователь"].includes(r.name)) ) 
    return message.reply("`Нет прав для выполнения действия.`");
  if(args[0] == "help"){
    message.reply("Usage: !mute <user> <1s/m/h/d>");
    return;
  }
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.channel.send("`Используйте: !mute [@упоминание] [срок] [причина] `");
  let reason = args.slice(2).join(" ");
  if(!reason) return message.channel.send("`Не указана причина мута!`");
  if(!tomute.id == message.author.id) return message.channel.send("`Нельзя замутить самого себя!`");
  if (tomute.highestRole.position >= message.member.highestRole.position) return message.channel.send("`Нельзя использовать на старших по должности или на самом себе.`");

  let muterole = message.guild.roles.find(`name`, "Muted ☊");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Muted ☊",
        color: "#8b8989",
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
  if (tomute.roles.has(muterole.id)) return message.channel.send("`Данный пользователь уже имеет бан чата.`");

 try{
  await tomute.addRole(muterole);
  message.channel.send(`\`Модератор ${message.author} выдал мут игроку ${tomute} на ${mutetime}. Причина: ${reason}.\``);
} catch(e) {
  message.channel.send(`**Ошибка: ${e.message}**`);
}

  try{
    const channel = message.client.channels.find('name', "🌏общение");
channel.send(`\`Модератор\` ${message.author} \`заглушил игрока\` ${tomute} на ${mutetime}. Причина: **${reason}.**`);
  } catch(e) {
    message.reply(`\`нет доступа.\``)
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
    message.channel.send(`\`У\` <@${tomute.id}> \`мут был снят по окончанию срока.\``);
  }, ms(mutetime));


//end of module
}

module.exports.help = {
  name: "mute"
}
