const { CommandInteraction, MessageEmbed } = require("discord.js");
const { Collection } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
const { client } = require("../../index.js")
const moment = require('moment');
const db = require("../../databases/AFKSystem.js");

const afk2 = new Collection();

module.exports = {
  name: "afk23", 
  category: "Information", 
  cooldown: 5, 
  usage: "afk23 [sebep]", 
  description: "AFK olurken belirtilen notu (nedeni) birisi tarafından etiketlenince iletir.", 
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
    try{
      const reason = args.join(" ") || "Belirtilmedi.";

      afk2.set(message.author.id, [ Date.now(), reason])

      await db.findOneAndUpdate(
                        {GuildID: message.guild.id, UserID: message.author.id},
                        {Status: reason, Time: Date.now()},
                        {new: true, upsert: true}
                    )

      message.reply({ embeds: [new MessageEmbed()
        .setColor('#000000')
        .setThumbnail("https://cdn.discordapp.com/emojis/886068576556027934.gif?size=4096")
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`AFK Modu Açıldı.\n\nAFK Sebebi: \`${reason}\``)
      ]}); 
  
  client.on('messageCreate', async(message) => {
    if(!message.guild || message.author.bot) return;

    const mentionedMember = message.mentions.users.first();

    const user = await db.findOne({ UserID: mentionedMember.id });

    console.log(user.Time.toString())

    if(mentionedMember) {
        const data = afk2.get(mentionedMember.id);
        if(data) {
            const [ timestamp, reason ] = data;
            moment.locale('tr');
            const timeAgo = moment(user.Time).fromNow();

        message.reply({ embeds: [new MessageEmbed()
        .setColor('#000000')
        .setThumbnail('https://cdn.discordapp.com/attachments/819304605958668318/909976640698847282/ezgif-7-8b1248f96467.gif')
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`**:mute: | O şuanda burada değil.\n**`)
        .setDescription(`**\n:hourglass: | AFK Olduğu Süre:** \`${timeAgo}\`\n\n**:grey_question: | AFK Sebebi:** \`${reason}\``)
      ]});
        }
    }
})

client.on('messageCreate', async(message) => {
  if (!message.guild || message.author.bot) return;

  const afkUser = await db.findOne({ UserID: message.author.id });

  if (afkUser) {
    await db.findOneAndDelete({ UserID: message.author.id });
  }

})

    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.reply({embeds: [new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ HATA | Bir hata meydana geldi.`)
            .setDescription(`\`\`\`${e.message ? String(e.message).substr(0, 2000) : String(e).substr(0, 2000)}\`\`\``)
        ]});
    }
  }
}
