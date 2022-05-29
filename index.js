const Discord = require("discord.js");
const config = require(`./botconfig/config.json`);
const settings = require(`./botconfig/settings.json`);
const colors = require("colors");
const keep_alive = require('./keep_alive.js')
const db2 = require('quick.db')
const mongoose = require('mongoose');
const { Database } = require('./botconfig/config.json')
const moment = require('moment');
const db = require("./databases/AFKSystem.js");
const { CommandInteraction, MessageEmbed, MessageAttachment } = require("discord.js");
const ee = require("./botconfig/embed.json");
const Canvas = require("discord-canvas");
const memberCounter = require('./counters/memberCounter');
const fetch = require("axios")
const pop = require('popcat-wrapper')



const client = new Discord.Client({
  //fetchAllMembers: false,
  //restTimeOffset: 0,
  //restWsBridgetimeout: 100,
  shards: "auto",
  allowedMentions: {
    parse: [],
    repliedUser: false,
  },
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    //Discord.Intents.FLAGS.GUILD_BANS,
    //Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    //Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
    //Discord.Intents.FLAGS.GUILD_WEBHOOKS,
    //Discord.Intents.FLAGS.GUILD_INVITES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    //Discord.Intents.FLAGS.GUILD_PRESENCES,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    //Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
    //Discord.Intents.FLAGS.DIRECT_MESSAGES,
    //Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    //Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING
  ],
  presence: {
    activity: {
      name: `© | Maymunlar Dünyası`,
      type: "LISTENING",
    },
    status: "available"
  }
});

client.snipes = new Discord.Collection()

client.on('messageDelete', message => {
    if(message.author.id === client.user.id) return;
    if (!message.guild) return;
    if (message.content.startsWith("+")) return;
    let snipes = client.snipes.get(message.channel.id) || [];
    if(snipes.length > 10) snipes = snipes.slice(0, 9);

    snipes.unshift({
        content: message.content,
        member: message.member,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null,
        time: Date.now()
    });

    client.snipes.set(message.channel.id, snipes);
})

/*
client.on('guildMemberAdd', (member) => {
  if (!member.guild) return;

  const welcomeChannel = member.guild.channels.cache.get("660777942661726218");
  
  memberCounter(client);

  const uri = `https://api.popcat.xyz/welcomecard?background=https://media.discordapp.net/attachments/819304605958668318/945095514318327878/unknown.png&text1=${member.user.username}&text2=Maymunlar+Dünyasına+Hosgeldin&text3=${member.guild.memberCount}. Maymunsun&avatar=${member.displayAvatarURL()}`;

  const res = encodeURI(uri); 

  const embed = new MessageEmbed()
    .setDescription(`**Selam <@${member.user.id}>, hoşgeldin.**`)
    .setImage(res)
    .setFooter(ee.footertext, ee.footericon)
    .setColor("#FE6554")
    .setThumbnail("https://c.tenor.com/9pvpRpUyaYgAAAAC/welcome.gif")

  welcomeChannel.send({ embeds: [ embed ] });
})

client.on('guildMemberRemove', (member) => {
  const leaveChannel = member.guild.channels.cache.get("660777942661726218");

  const embed = new MessageEmbed()
  .setTitle(`**Kalk siktir git burdan**`)
  .setDescription(`<@${member.user.id}>`)
  .setFooter(ee.footertext, ee.footericon)
  .setColor("#FE6554")
  .setThumbnail("https://media.discordapp.net/attachments/819304605958668318/945333673186697226/ezgif-2-e5eb60b989.gif")

  leaveChannel.send({ embeds: [ embed ] });
})
*/


client.on("messageCreate", async (message) => {
  let prefix = config.prefix
  if (!message.guild) return;
  if (message.author.bot) return;
  if (message.type == "REPLY") return;
  if (message.channel.partial) await message.channel.fetch();
  if (message.partial) await message.fetch();

  if (message.mentions.has(client.user) && !message.content.includes("@here") && !message.content.includes("@everyone")) {
    return message.reply({
      embeds: [new MessageEmbed()
      .setColor(ee.color)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle(`<a:developer:934161367622099004> | **Selam, __ANIL YALIMDEMIR#6416__ Tarafından Yapıldım. Herhangi bir sorun için ona ulaş.**`)
      .setDescription(`**<a:attachment:934133367904043018> | Benim komutlarımı kullanmak istiyorsan komutları + işareti ile kullan.**`)
      ]
    })
}});


client.on('messageCreate', async (message) => {
  if (!message.guild || message.author.bot || message.type == "REPLY") return;

  if (message.channel.partial) await message.channel.fetch();
  if (message.partial) await message.fetch();

  const mentionedMember = message.mentions.members.first();

  if (!mentionedMember) return;

  const afkMember = await db.findOne({ UserID: message.mentions.members.first().id, GuildID: message.guild.id })

  if (afkMember != null) {
    moment.locale('tr');

    const time = afkMember.Time;

     const timeAgo = moment(time).fromNow();

    message.reply({
      embeds: [new MessageEmbed()
        .setColor('#000000')
        .setThumbnail('https://cdn.discordapp.com/attachments/819304605958668318/909976640698847282/ezgif-7-8b1248f96467.gif')
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`**:mute: | O şuanda burada değil.**`)
        .setDescription(`**\n:hourglass: | AFK Olduğu Süre:** \`${timeAgo}\` \n\n**:grey_question: | AFK Sebebi:** \`${afkMember.Status}\``)
      ]
    });
  }

})



client.on('ready', () => {
  memberCounter(client);

  if (!Database) return;
  mongoose.connect(Database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("The client is now connected to the database!")
  }).catch((err) => {
    console.log(err)
  });
})


client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = require("fs").readdirSync(`./commands`);
//Require the Handlers                  Add the antiCrash file too, if its enabled
["events", "commands", "slashCommands", settings.antiCrash ? "antiCrash" : null]
  .filter(Boolean)
  .forEach(h => {
    require(`./handlers/${h}`)(client);
  })

setTimeout(() => {
  client.login(process.env.TOKEN);
}, 500)