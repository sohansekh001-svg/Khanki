const schedule = require('node-schedule');
const moment = require('moment-timezone');
const chalk = require('chalk');

module.exports.config = {
    name: 'autosent',
    version: '10.0.1',
    hasPermssion: 0,
    credits: 'Shahadat Islam',
    description: 'Automatically sends messages at scheduled times (India Time)',
    commandCategory: 'group messenger',
    usages: '[]',
    cooldowns: 3
};

const messages = [
    { time: '12:00 AM', message: 'এখন সময় রাত 12:00 AM ⏳\nঘুমিয়ে পড় 😴💤❤️\nনা হলে ভূত এসে WiFi নিয়ে যাবে 👻📶😂', special: null },

    { time: '1:00 AM', message: 'এখন সময় রাত 1:00 AM ⏳\nএখনো জেগে? মোবাইল বিয়ে করে ফেলছ নাকি? 📱💍😂', special: null },

    { time: '2:00 AM', message: 'এখন সময় রাত 2:00 AM ⏳\nঘুমে আয় ভাই 😤👊💤\nনা হলে বিছানা পালিয়ে যাবে 😆🛌', special: null },

    { time: '3:00 AM', message: 'এখন সময় রাত 3:00 AM ⏳\nসবাই ঘুমায় তুই জেগে? Netflix চলছে নাকি? 🎬😂', special: null },

    { time: '4:00 AM', message: 'এখন সময় ভোর 4:00 AM ⏳\nআজান হবে 🕌🕋\nউঠ না হলে স্বপ্ন হারিয়ে যাবে 😴💭', special: null },

    { time: '5:00 AM', message: 'এখন সময় ভোর 5:00 AM ⏳\nনামাজ পড় 🤲✨\nআলসেমি তোর বিরুদ্ধে কেস দিছে 😂📄', special: null },

    { time: '6:00 AM', message: 'এখন সময় সকাল 6:00 AM ⏳\nGood Morning 🌅💖\nবিছানা তোকে ছাড়তে চাইছে না 😆🛌', special: null },

    { time: '7:00 AM', message: 'এখন সময় সকাল 7:00 AM ⏳\nঘুম ভাঙো 😄📱\nনা হলে স্বপ্ন অফ হয়ে যাবে 😂', special: null },

    { time: '8:00 AM', message: 'এখন সময় সকাল 8:00 AM ⏳\nBrush করো 🪥🍽️\nনা হলে মুখ WiFi block করে দেবে 😆', special: null },

    { time: '9:00 AM', message: 'এখন সময় সকাল 9:00 AM ⏳\nBreakfast করো 🍳🥞\nনা খেলে পেট protest করবে 🤣', special: null },

    { time: '10:00 AM', message: 'এখন সময় সকাল 10:00 AM ⏳\nStudy time 📚\nনা পড়লে ভবিষ্যৎ block হয়ে যাবে 😜', special: null },

    { time: '11:00 AM', message: 'এখন সময় সকাল 11:00 AM ⏳\nচল কাজ কর 💼\nআলসেমি delete কর দে 😆', special: null },

    { time: '12:00 PM', message: 'এখন সময় দুপুর 12:00 PM ⏳\nGood Afternoon 🌞\nখাও দাও 🍽️ না হলে battery low 🔋😂', special: null },

    { time: '1:00 PM', message: 'এখন সময় দুপুর 1:00 PM ⏳\nLunch time 🍽️\nনা খেলে পেট রাগ করবে 😤', special: null },

    { time: '2:00 PM', message: 'এখন সময় দুপুর 2:00 PM ⏳\nRest time 😌\nনা ঘুমালে system hang করবে 😆💤', special: null },

    { time: '3:00 PM', message: 'এখন সময় বিকেল 3:00 PM ⏳\nAfternoon vibes 🌤️\nচা না খেলে মুড off ☕😂', special: null },

    { time: '4:00 PM', message: 'এখন সময় বিকেল 4:00 PM ⏳\nTea time ☕\nচা না খেলে মন crash করবে 😆', special: null },

    { time: '5:00 PM', message: 'এখন সময় বিকেল 5:00 PM ⏳\nEvening 🌆\nমজা করো 😎🔥', special: null },

    { time: '6:00 PM', message: 'এখন সময় সন্ধ্যা 6:00 PM ⏳\nGood Evening 🌇\nহাসতে থাকো 😄✨', special: null },

    { time: '7:00 PM', message: 'এখন সময় সন্ধ্যা 7:00 PM ⏳\nStudy again 📚\nনা পড়লে exam তোমাকে block করবে 😆', special: null },

    { time: '8:00 PM', message: 'এখন সময় রাত 8:00 PM ⏳\nRelax 😎\nbot বলছে chill কর 😆🔥', special: null },

    { time: '9:00 PM', message: 'এখন সময় রাত 9:00 PM ⏳\nDinner 🍽️\nনা খেলে মন খারাপ 😢😂', special: null },

    { time: '10:00 PM', message: 'এখন সময় রাত 10:00 PM ⏳\nMobile off 📱❌\nনা হলে মা এসে WiFi নিয়ে যাবে 😂🔥', special: null },

    { time: '11:00 PM', message: 'এখন সময় রাত 11:00 PM ⏳\nGood Night 😴💤\nস্বপ্নে দেখা হবে 👻❤️', special: null }
];

module.exports.onLoad = ({ api }) => {
    console.log(chalk.bold.hex("#00c300")("============ AUTOSENT LOADED (INDIA TIME) ============"));

    messages.forEach(({ time, message }) => {
        const [hour, minute, period] = time.split(/[: ]/);

        let hour24 = parseInt(hour, 10);

        if (period === 'PM' && hour !== '12') {
            hour24 += 12;
        } else if (period === 'AM' && hour === '12') {
            hour24 = 0;
        }

        const rule = new schedule.RecurrenceRule();

        // INDIA TIME
        rule.tz = 'Asia/Kolkata';

        rule.hour = hour24;
        rule.minute = parseInt(minute, 10);

        schedule.scheduleJob(rule, () => {
            if (!global.data?.allThreadID) return;

            global.data.allThreadID.forEach(threadID => {
                api.sendMessage(message, threadID, (error) => {
                    if (error) {
                        console.error(`Failed to send message to ${threadID}:`, error);
                    }
                });
            });
        });

        console.log(chalk.hex("#00FFFF")(`Scheduled (IST): ${time}`));
    });
};

module.exports.run = () => {};
