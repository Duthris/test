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
const fetch2 = require('node-fetch');
const voice = require('@discordjs/voice')

module.exports = {
	name: "hadi", 
	category: "Audio", 
	aliases: ["hadizıpla","zıpla"], 
	cooldown: 0, 
	usage: "hadi", 
	description: "Boncuk odaya gelir zac taklidi yapar ve çıkar.", 
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
      const channel = message.member.voice.channel;

      if(!channel) return message.reply({embeds: [new MessageEmbed()
                                              .setColor(ee.wrongcolor)
                                              .setFooter(ee.footertext,ee.footericon)  .setTitle(`<a:wrong:927241890099761173> | Önce bir kanala katıl!`)
                                                 ]}).then(msg => {
        setTimeout(() => {
          msg.delete();
          message.delete();
        }, 3000);
                                                 })

      const player = voice.createAudioPlayer();
      const resource = voice.createAudioResource(`${process.cwd()}/zıpla.mp3`);

      const connection = voice.joinVoiceChannel({
        channelId: channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator,
      });

      player.play(resource);
      connection.subscribe(player);

      message.delete();

      player.on(voice.AudioPlayerStatus.Idle, () => {
        connection.destroy();
      })
     
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