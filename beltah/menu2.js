const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou({ nomCom: "menu2", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }


    

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

  let infoMsg =  `
╭─────────────────✣
│☹︎╭─────────────✣
│☹︎│▸ *BOT-OWNER* : ${s.OWNER_NAME}
│☹︎│▸ *TODAY* : ${date}
│☹︎│▸ *PREFIX* : ${s.PREFIXE}
│☹︎│▸ *WORKTYPE* : ${mode} mode
│☹︎│▸ *PLUGINS* : ${cm.length} 
│☹︎│▸ *STORAGE* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
│☹︎│▸ *RUNNING ON* : ${os.platform()}
│☹︎│▸ *THEME* : *❣️𝙱𝚁𝚈𝙰𝙽𝚃 𝚃𝙴𝙲𝙷❣️*
│☹︎╰──────────────✇
╰──────────────────✇
╭───────────────✣
  《《 *𝗕𝗥𝗬𝗔𝗡𝗧 𝗠𝗗* 》》
╰───────────────✇\n`;
    
let menuMsg = `
╭─────────✦
   *𝙱𝚁𝚈𝙰𝙽𝚃.𝙸𝙽𝙲*
╰─────────✣

 *❄︎LIST PLUGINS❄︎*
`;

    for (const cat in coms) {
        menuMsg += ` ╭──────✦ *${cat}* ✦─────☹︎`;
        for (const cmd of coms[cat]) {
            menuMsg += `
│✇│ ${cmd}`;
        }
        menuMsg += `
╰────────────···▸▸ \n`
    }

    menuMsg += `
◇            ◇
*»»————————— ★ ——————————««*
|⏣𝑩𝑹𝒀𝑨𝑵𝑻-𝑴𝑫 𝑪𝑹𝑬𝑨𝑻𝑬𝑫 𝑩𝒀 𝑩𝑹𝒀𝑨𝑵𝑻 𝑻𝑬𝑪𝑯.𝑰𝑵𝑪
|⏣*𝑹𝑬𝑳𝑬𝑨𝑺𝑬𝑫 𝑶𝑵: 𝟎𝟐.𝟎𝟔.𝟐𝟎𝟐𝟒*
|⏣𝑻𝑯𝑨𝑵𝑲 𝒀𝑶𝑼 𝑭𝑶𝑹 𝑪𝑯𝑶𝑶𝑺𝑰𝑵𝑮 *𝑩𝑹𝒀𝑨𝑵𝑻 𝑴𝑫*
*»»—————————— ★ ——————————««*
`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Bryantmd*, déveloper Bryant Tech" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Bryantmd*, déveloper Bryant Tech" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(infoMsg + menuMsg);
    
}

});
