const Discord = require("discord.js");
const bot = new Discord.Client();
const token = require("./token.json");

var prefix = ("?")

bot.on('ready', async () => {
    bot.user.setStatus("dnd");
    setTimeout(() => {
        bot.user.setActivity('Faire du Vide', {type: "PLAYING"});
    }, 100);
     
    console.log("i am ready");
});


bot.login(token.token);


bot.on(`message`, message => {
    if(message.content === "bonjour"){
        message.reply(`**Bonjour,sa va ? **`);
        console.log(" >> An user said : 'bonjour' ")
    }

    if(message.content === prefix + " youtube"){
        message.reply("**Notre chaine est :\n https://www.youtube.com/channel/UC-jm8yy6dszCQxq76HMJTRw**");
        console.log(" >> An user said : '?youtube' ")
    }
    if(message.content === "bien et toi ?"){
        message.reply("**Nikel !**");
        console.log(" >> An user said : 'bien et toi ?'")
    }

    
});

bot.on("guildMemberAdd", member =>{
    member.send(`Bienvenue ${member} sur le server **Astro**, Va accepter les règles pour avoir accès au reste du server !`);
    bot.channels.cache.get("706109074823184385").send(`Bienvenue sur **Astro**, ${member} !!`);
});

bot.on('message', message =>{
    if(message.content.startsWith("?clear")){
        
        if (message.member.hasPermission("MANAGE_MESSAGES")){

            let args = message.content.trim().split(/ +/g);
            
            if(args[1]){

                if(!isNaN(args[1]) && args[1] >= 1 && args[1] <= 99){
                    message.delete();
                    message.channel.bulkDelete(args[1]);
                    message.channel.send(`${args[1]} messages supprimés !`);
                    setTimeout( () => {
                        message.channel.bulkDelete(1);
                    }, 2000);
                    

                }
                else{

                    message.channel.send(`Le nombre doit être entre 1 et 99 (inclus).`);

                    
                }
                
            }
            else{
                message.channel.send(`${args[1]} n'est pas un nombre valide.`);
            }
            
        }
        else {
            message.channel.send(`${message.author} vous n'avez pas la permition requise pour cette commande !`);
        }
        
    }

});
