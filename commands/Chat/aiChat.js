const Discord = require("discord.js");
const {
	MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const {
	GetUser,
	GetGlobalUser
} = require("../../handlers/functions")
const settings = require("../../botconfig/settings.json");
const fetch = require('axios')
const pop = require('popcat-wrapper')
const fetch2 = require('node-fetch');
const translate = require('@iamtraction/google-translate');

module.exports = {
	name: "chat", 
	category: "Chat", 
	aliases: ["hey"], 
	cooldown: 0, 
	usage: "chat [mesaj]", 
	description: "Muhabbete katılabilirim.", 
	memberpermissions: [], 
	requiredroles: [], 
	alloweduserids: [], 
	minargs: 0, 
	maxargs: 0, 
	minplusargs: 0, 
	maxplusargs: 0, 
	argsmissing_message: "", 
	argstoomany_message: "", 
	
	run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
		try {
      const msg = args.slice(0).join(" ");
      const encodeMsg = encodeURI(msg);

      
      const argsTranslate = `https://api.popcat.xyz/translate?to=en&text=${encodeMsg}`;
      const argsTranslatedResult = await fetch(argsTranslate);

      let argsTranslatedResponse = await argsTranslatedResult.data.translated;
      

      const argsResponseEncode = encodeURI(argsTranslatedResponse);

      const uri = `https://api.popcat.xyz/chatbot?msg=${argsResponseEncode}&owner=<@327431325147463681>&botname=<@909984704042774589>`;
    
      let result = await fetch(uri);
      let response = await result.data;
      let textEnglish = await response.response;
      
      console.log(argsTranslatedResponse);
      console.log(response);
      console.log(textEnglish);

      let translated = await translate(textEnglish, {to : 'tr'});

      let translatedFinalText = await translated.text;

      message.reply(translatedFinalText);
     
     
		} catch (e) {
			message.channel.messages.channel.bulkDelete(1);
			console.log(String(e.stack).bgRed)
			return message.reply({
				embeds: [new MessageEmbed()
					.setColor(ee.wrongcolor)
					.setFooter(ee.footertext, ee.footericon)
					.setTitle(`<a:wrong:927241890099761173> HATA | Bir hata meydana geldi!`)
					.setDescription(`\`\`\`${e.message ? String(e.message).substr(0, 2000) :         String(e).substr(0, 2000)}\`\`\``).then(msg => {
						msg.react("<a:wrong:927241890099761173> ");
						setTimeout(() => {
							msg.delete()
						}, 5000);
					})
				]
			});
		}
	}
}