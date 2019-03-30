const Discord = require('discord.js');

exports.get = () => {
    let canremoverole = [
        "Лидеры", 
        "Заместители", 
        "Министры", 
    ];
    return canremoverole;
}
