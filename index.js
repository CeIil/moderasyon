const Discord = require("discord.js");
const client = new Discord.Client();
const jimp = require("jimp");
const db = require("quick.db");
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
require("./util/eventLoader")(client);

//-------------------- 7/24 Uptime --------------------//
//-------------------- 7/24 Uptime --------------------//
//-------------------- 7/24 Uptime --------------------//

const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log(`7/24 Hizmet Vermekteyim!`);
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

//-------------------- 7/24 Uptime --------------------//
//-------------------- 7/24 Uptime --------------------//
//-------------------- 7/24 Uptime --------------------//

client.on("ready", async () => {
  client.appInfo = await client.fetchApplication();
  setInterval(async () => {
    client.appInfo = await client.fetchApplication();
  }, 600);
});

const log = message => {
  console.log(` ${message}`);
};
require("./util/eventLoader.js")(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

client.login(ayarlar.token);

//-------------------- Küfür Engel --------------------//
//-------------------- Küfür Engel --------------------//
//-------------------- Küfür Engel --------------------//

client.on("message", async msg => {
  const i = await db.fetch(`${msg.guild.id}.kufur`);
  if (i) {
    const kufur = [
      "oç",
      "amk",
      "ananı sikiyim",
      "ananıskm",
      "piç",
      "amk",
      "amsk",
      "sikim",
      "sikiyim",
      "orospu çocuğu",
      "piç kurusu",
      "kahpe",
      "orospu",
      "mal",
      "sik",
      "yarrak",
      "am",
      "amcık",
      "amık",
      "yarram",
      "sikimi ye",
      "mk",
      "mq",
      "aq",
      "ak",
      "amq"
    ];
    if (kufur.some(word => msg.content.includes(word))) {
      try {
        if (!msg.member.hasPermission("BAN_MEMBERS")) {
          msg.delete();

          const kinda = new Discord.MessageEmbed()

            .setDescription("Bu Sunucuda Küfür Edemezsin.")
            .setColor("BLACK");

          return msg.reply(kinda);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});

client.on("messageUpdate", msg => {
  const i = db.fetch(`${msg.guild.id}.kufur`);
  if (i) {
    const kufur = [
      "oç",
      "amk",
      "ananı sikiyim",
      "ananıskm",
      "piç",
      "amk",
      "amsk",
      "sikim",
      "sikiyim",
      "orospu çocuğu",
      "piç kurusu",
      "kahpe",
      "orospu",
      "mal",
      "sik",
      "yarrak",
      "am",
      "amcık",
      "amık",
      "yarram",
      "sikimi ye",
      "mk",
      "mq",
      "aq",
      "ak",
      "amq"
    ];
    if (kufur.some(word => msg.content.includes(word))) {
      try {
        if (!msg.member.hasPermission("BAN_MEMBERS")) {
          msg.delete();

          const kinda = new Discord.MessageEmbed()

            .setDescription("Bu Sunucuda Küfür Edemezsin.")
            .setColor("BLACK");

          return msg.reply(kinda);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});

//-------------------- Küfür Engel --------------------//
//-------------------- Küfür Engel --------------------//
//-------------------- Küfür Engel --------------------//

//-------------------- Ever Here Engel --------------------//
//-------------------- Ever Here Engel --------------------//
//-------------------- Ever Here Engel --------------------//

client.on("message", async msg => {
  let hereengelle = await db.fetch(`hereengel_${msg.guild.id}`);
  if (hereengelle == "acik") {
    const here = ["@here", "@everyone"];
    if (here.some(word => msg.content.toLowerCase().includes(word))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();
        msg.channel
          .send(`<@${msg.author.id}>`)
          .then(message => message.delete());
        var e = new Discord.MessageEmbed()
          .setColor("BLACK")
          .setDescription(`Bu Sunucuda Everyone ve Here Yasak!`);
        msg.channel.send(e);
      }
    }
  } else if (hereengelle == "kapali") {
  }
});

//-------------------- Ever Here Engel --------------------//
//-------------------- Ever Here Engel --------------------//
//-------------------- Ever Here Engel --------------------//

//-------------------- Otorol Sistemi --------------------//
//-------------------- Otorol Sistemi --------------------//
//-------------------- Otorol Sistemi --------------------//

client.on("guildMemberAdd", async member => {
  let kanal1 = await db.fetch(`otorolkanal_${member.guild.id}`);
  let rol1 = await db.fetch(`otorolrol_${member.guild.id}`);

  let kanal = member.guild.channels.cache.get(kanal1);
  let rol = member.guild.roles.cache.get(rol1);

  if (!kanal) return;
  if (!rol) return;

  const embed = new Discord.MessageEmbed()

    .setColor("BLACK")
    .setDescription(
      `Sunucuya Katılan **${member}** Adlı Kullanıcıya Başarıyla \`${rol.name}\` Rolü Verildi.`
    );

  kanal.send(embed);
  member.roles.add(rol);
});

//-------------------- Otorol Sistemi --------------------//
//-------------------- Otorol Sistemi --------------------//
//-------------------- Otorol Sistemi --------------------//

//-------------------- Afk Sistemi --------------------//
//-------------------- Afk Sistemi --------------------//
//-------------------- Afk Sistemi --------------------//

const ms = require("parse-ms");
const { DiscordAPIError } = require("discord.js");

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.content.includes(`afk`)) return;

  if (await db.fetch(`afk_${message.author.id}`)) {
    db.delete(`afk_${message.author.id}`);
    db.delete(`afk_süre_${message.author.id}`);

    const embed = new Discord.MessageEmbed()

      .setColor("GREEN")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setDescription(`Afk Modundan Başarıyla Çıkıldı.`);

    message.channel.send(embed);
  }

  var USER = message.mentions.users.first();
  if (!USER) return;
  var REASON = await db.fetch(`afk_${USER.id}`);

  if (REASON) {
    let süre = await db.fetch(`afk_süre_${USER.id}`);
    let timeObj = ms(Date.now() - süre);

    const afk = new Discord.MessageEmbed()

      .setColor("RED")
      .setDescription(
        `**BU KULLANICI AFK**\n\n**Afk Olan Kullanıcı :** \`${USER.tag}\`\n**Afk Süresi :** \`${timeObj.hours}saat\` \`${timeObj.minutes}dakika\` \`${timeObj.seconds}saniye\`\n**Sebep :** \`${REASON}\``
      );

    message.channel.send(afk);
  }
});

//-------------------- Afk Sistemi --------------------//
//-------------------- Afk Sistemi --------------------//
//-------------------- Afk Sistemi --------------------//

//-------------------- Giriş Çıkış Sistemi --------------------//
//-------------------- Giriş Çıkış Sistemi --------------------//
//-------------------- Giriş Çıkış Sistemi --------------------//

client.on("guildMemberAdd", async member => {
  let girenKisi = client.users.get(member.id);
  let girisKanal = client.channels.get(db.fetch(`hgK_${member.guild.id}`));
  let Güvenli = `${member} Bu Hesap Güvenli!`;
  let Şüpheli = `${member} Bu Hesap Güvenli Değil!`;

  const ktarih = new Date().getTime() - girenKisi.createdAt.getTime();
  var kontrol;

  if (ktarih > 2629800000) kontrol = Güvenli;
  if (ktarih < 2629800001) kontrol = Şüpheli;
  let kanal = await db.fetch(`hgK_${member.guild.id}`);

  if (!kanal) return;

  const giris = new Discord.RichEmbed()

    .setColor("GREEN")
    .setDescription(
      `${member} Adlı Kullanıcı Aramıza Katıldı!\nBu Kullanıcıyla Birlikte **${member.guild.memberCount}** Kişi Olduk!\nKullanıcı İd : **${member.user.id}**\n\n**Güvenlik Durumu :**\n${kontrol}`
    );

  client.channels.get(kanal).send(giris);
});

client.on("guildMemberRemove", async member => {
  let kanal = await db.fetch(`baybayK_${member.guild.id}`);
  if (!kanal) return;

  const cikis = new Discord.RichEmbed()
    .setColor("RED")
    .setDescription(
      `${member} Adlı Kullanıcı Aramızdan Ayrıldı!\nBu Kullanıcının Aramızdan Ayrılmasıyla Birlikte **${member.guild.memberCount}** Kişiye Düştük!\nKullanıcı İd : **${member.user.id}**\n`
    );

  client.channels.get(kanal).send(cikis);
});

//-------------------- Giriş Çıkış Sistemi --------------------//
//-------------------- Giriş Çıkış Sistemi --------------------//
//-------------------- Giriş Çıkış Sistemi --------------------//

//-------------------- Sa As Sistemi --------------------//
//-------------------- Sa As Sistemi --------------------//
//-------------------- Sa As Sistemi --------------------//

client.on("message", async message => {
  const Bdgo = message.content.toLocaleLowerCase();

  if (
    Bdgo === "selam" ||
    Bdgo === "sa" ||
    Bdgo === "selamün aleyküm" ||
    Bdgo === "selamun aleyküm" ||
    Bdgo === "slm" ||
    Bdgo === "sea"
  ) {
    let e = await db.fetch(`sa-as_${message.guild.id}`);
    if (e === "acik") {
      const embed = new Discord.RichEmbed()
      
     .setDescription(`Aleyküm Selam, Hoş Geldin ^-^`)
     .setColor("GREEN")
      
    return message.channel.send(embed)
    }
  }
});

//-------------------- Sa As Sistemi --------------------//
//-------------------- Sa As Sistemi --------------------//
//-------------------- Sa As Sistemi --------------------//

//-------------------- Reklam Engel Sistemi --------------------//
//-------------------- Reklam Engel Sistemi --------------------//
//-------------------- Reklam Engel Sistemi --------------------//

client.on("message", async message => {
  let uyarisayisi = await db.fetch(`reklamuyari_${message.author.id}`);
  let reklamkick = await db.fetch(`kufur_${message.guild.id}`);
  let kullanici = message.member;
  if (!reklamkick) return;
  if (reklamkick == "Açık") {
    const reklam = [
      "discord.app",
      "discord.gg",
      ".com",
      ".net",
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".org",
      ".com.tr",
      ".biz",
      ".party",
      ".rf.gd",
      ".az"
    ];
    if (reklam.some(word => message.content.toLowerCase().includes(word))) {
      if (!message.member.hasPermission("BAN_MEMBERS")) {
        message.delete();
        db.add(`reklamuyari_${message.author.id}`, 1); //uyarı puanı ekleme
        if (uyarisayisi === null) {
          let uyari = new Discord.RichEmbed()
            .setColor("BLACK")
            .setTitle("Kinsta Reklam-Engel!")
            .setDescription(
              `<@${message.author.id}> Reklam Yapmayı Kes! Bu İlk Uyarın! (1/3)`
            )
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
          message.channel.send(uyari);
        }
        if (uyarisayisi === 1) {
          let uyari = new Discord.RichEmbed()
            .setColor("BLACK")
            .setTitle("Kinsta Reklam-Engel!")
            .setDescription(
              `<@${message.author.id}> Reklam Yapmayı Kes! Bu İkinci Uyarın! (2/3)`
            )
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
          message.channel.send(uyari);
        }
        if (uyarisayisi === 2) {
          message.delete();
          await kullanici.kick({
            reason: `Reklam-Engel Sistemi!`
          });
          let uyari = new Discord.RichEmbed()
            .setColor("BLACK")
            .setTitle("Kinsta Reklam-Engel!")
            .setDescription(
              `<@${message.author.id}> Reklam Yaptığı İçin Sunucudan Atıldı! (3/3)`
            )
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
          message.channel.send(uyari);
        }
        if (uyarisayisi === 3) {
          message.delete();
          await kullanici.ban({
            reason: `Kinsta Reklam-Engel Sistemi!`
          });
          db.delete(`reklamuyari_${message.author.id}`);
          let uyari = new Discord.RichEmbed()
            .setColor("BLACK")
            .setTitle("Kinsta Reklam Kick Sistemi")
            .setDescription(
              `<@${message.author.id}> Atıldıktan Sonra Tekrar Reklam Yaptığı İçin Sunucudan Yasaklandı!`
            )
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
          message.channel.send(uyari);
        }
      }
    }
  }
});

//-------------------- Reklam Engel Sistemi --------------------//
//-------------------- Reklam Engel Sistemi --------------------//
//-------------------- Reklam Engel Sistemi --------------------//

//-------------------- Prefix Sistemi --------------------//
//-------------------- Prefix Sistemi --------------------//
//-------------------- Prefix Sistemi --------------------//

client.on("message", async message => {

  if (message.author.bot) return;

  if (!message.guild) return;

  let prefix = db.get(`prefix_${message.guild.id}`);

  if (prefix === null) prefix = prefix;



  if (!message.content.startsWith(prefix)) return;



  if (!message.member)

    message.member = await message.guild.fetchMember(message);



  const args = message.content

    .slice(prefix.length)

    .trim()

    .split(/ +/g);

  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;
  
  let command = client.commands.get(cmd);

  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) command.run(client, message, args);

});

//-------------------- Prefix Sistemi --------------------//
//-------------------- Prefix Sistemi --------------------//
//-------------------- Prefix Sistemi --------------------//