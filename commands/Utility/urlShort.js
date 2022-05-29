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

module.exports = {
	name: "link", 
	category: "Utility", 
	aliases: ["url", "kısalt", "short"], 
	cooldown: 2, 
	usage: "link [link]", 
	description: "İstenilen URL'yi istenilen uzatmayla kısaltır.", 
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
			let uri = args[0];
			let url = encodeURI(uri);
			let extension = args[1];


			if (!uri || !extension) return message.reply({
				embeds: [new MessageEmbed()
					.setColor(ee.wrongcolor)
					.setFooter(ee.footertext, ee.footericon)
					.setTitle("<a:wrong:927241890099761173> | Url veya Uzantı vermeyi unuttun!")
				]
			}).then(msg => {
				setTimeout(() => {
					message.delete()
					msg.delete()
				}, 3000);
			})

			let result = await fetch(`https://api.popcat.xyz/shorten?url=${url}&extension=${extension}`);

			const msg = message.reply({
				embeds: [new MessageEmbed()
					.setColor(ee.color)
					.setFooter(ee.footertext, ee.footericon)
					.setTitle(`<a:Loading:749349813904080987> | **Bekleniyor...**`)
				]
			}).then(msg => {
				setTimeout(() => {
					msg.edit({
						embeds: [new MessageEmbed()
							.setColor(ee.color)
							.setFooter(ee.footertext, ee.footericon)
							.setTitle(`<a:check:927241846726484009> | Link başarıyla kısaltıldı.`)
							.setDescription("**<a:dm:946047899605798953> | Kısaltılan Link DM olarak gönderildi.**")
						]
					})

					message.author.send({
						embeds: [new MessageEmbed()
							.setColor(ee.color)
							.setFooter(ee.footertext, ee.footericon)
							.setTitle(`<a:check:927241846726484009> | Link Kısaltma Başarılı!`)
							.setDescription(`**<a:legit:933761276201537538> | Orijinal Link: ${uri}\n\n<a:legit:933761276201537538> | Kısaltılmış link: ${result.data.shortened}**`)
						]
					}).then(message.delete())

				}, 2500);
			});

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