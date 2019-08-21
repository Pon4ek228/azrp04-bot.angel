const Discord = require("discord.js");
const ms = require("ms");
const prefix = "!";

module.exports.run = async (bot, message, args) => {


  if(!message.member.hasPermission("VIEW_CHANNEL")) return message.reply("`Нет прав для выполнения действия.`");
  if(args[0] == "help"){
    message.reply("Usage: !mute <user> <1s/m/h/d>");
    return;
  }
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("`Используйте: !mute [@упоминание] [срок] [причина] `");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("`Данного пользователя нельзя замутить!`");
  let reason = args.slice(2).join(" ");
  if(!reason) return message.reply("`, пожалуйста, проверье правильность ввода!`");

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



 try{
  await tomute.addRole(muterole);
  message.channel.send(`\`Модератор\` ${message.author} \`успешно выдал мут игроку\` ${tomute} \`на ${mutetime}.\` \`Причина:\` **${reason}.**`);
} catch(e) {
  message.channel.send(`**Ошибка: ${e.message}**`);
}

  try{
    const channel = message.client.channels.find('name', "🌏общение");
channel.send(`\`Модератор\` ${message.author} \`заглушил игрока\` ${tomute} \`на ${mutetime}.\` \`Причина:\` **${reason}.**`);
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
