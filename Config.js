const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUlhZVIwTzJSRXVqT3NTR3ByZ2RKYTY1ZDVJeGhzQUI0em5keG5MY1dYVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSTZMbXJpenRPZm9oUzdUVFo4QkJpa3VyZG9QUllBejdRM21DWkNVNU93QT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvRUdNVkNpLzMzbUNHZ3BXelFoSWN1aC9MQk1zdWhKM2hra29LOUhhdEZzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtdHBEUHBiM0c0Y2xUQkZGV2ZuUCtSVlJjU0hzbk9xRFJEM01DeGNnUlVRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhGNks1SXk1cUFFM085QWFlQm1VNjhTREo0a0RwS0hZc2t2NTg5YWZ3blU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImJUSS9la0hTTllBeG1IS05VN0JYL3hNS0pEQTFkVTIvSlF0Wit4bWorMzQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEg1M1pFNHplZ1ZUK1daS0xjVTNxTS9NTVplOTEzNTR4VFFGdjgzTUpFZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMHFPYi9nTFNUb29tbTdxU2lzdzNuYlZPaXVzWmo5L0N3RXVWbk5MRVFYTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImR3dkdENnpwTHVXYXZSNUo0b0ZqbGpOSDVCQUh0UkQ3a1VOU2hkSEZrS0NXQ293TjRQUHJxK25wRE14WWJ5MzlmVkxxOXNzazlGSXdPZFh4eFFqV2d3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg5LCJhZHZTZWNyZXRLZXkiOiJoU0hjYmhyQ3d4bm1wVEQ3eW1TV3lhdVBpYytNNTkvbXczSzZMS2d4bFM4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ1Yy1RNFVVclI0NkFTbDBOUlZONDhRIiwicGhvbmVJZCI6IjE5MjMyOTFmLTFlYzYtNDZmYy1hMTRhLWMyZGZiNGQ4OWZlMSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjNWc5NDRTV2tsck5HelJteWlKejlsR3pyeWs9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaWlubzVKdzVkRE83dDd5QWVOQmFONTcyMVJjPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjdIU1pBTEc2IiwibWUiOnsiaWQiOiIxOTU0NjYxMjU2OTo0NEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJJIFRoaW5rIEFtIEFyY2FuZeKApiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTGkydlVrUTdvS1N0QVlZRXlBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5Ijoic1lOeE85WjNHZWhFcDkwY1pmMU9IUko1YzAvVi9RdXQ1N205bEhGcktqcz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiejNRSFdCdjBLc3pIZlc3TEdrb3JseE8vVDd3NFNlN1VITVE4TVVTNHVrSk5BeFpaRDIzc2JOcXJSa2xoMDZ5emN1NURFb1RDUFBSdU41VkdDRHJuQ2c9PSIsImRldmljZVNpZ25hdHVyZSI6InA4YzVtVC9qLzdqVXJHL3NCazFKbEM2MGpieWxkOE8wejF6bUhaZjYvQ2F5RVVuOC8zUUFYcWZXRzZKUDduOVE2ZDRTck5mNEN0eHZuZTRZTGVxa2hRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMTk1NDY2MTI1Njk6NDRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYkdEY1R2V2R4bm9SS2ZkSEdYOVRoMFNlWE5QMWYwTHJlZTV2WlJ4YXlvNyJ9fV0sInBsYXRmb3JtIjoic21iaSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxOTk1OTkzMCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFKRVoifQ== ',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Beltah Tech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "Beltah KE",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BELTAH_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/dcce2ddee6cc7597c859a.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
