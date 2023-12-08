require("dotenv").config();
const { Telegraf } = require("telegraf");

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;

const bot = new Telegraf(TOKEN);

// STARTING THE BOT
bot.command("start", (ctx) => {
  console.log(ctx.from);
  bot.telegram.sendMessage(
    ctx.chat.id,
    `hello ${ctx.from.first_name || "there"} 👋 
Welcome to my new telegram bot.
Where you will get interesting and funny jokes that makes your day.
Just type [give me a joke]
    `,
    {}
  );
});

//method that displays the inline keyboard buttons

bot.hears("give me a joke", async (ctx) => {
  console.log(ctx.from);
  let response = await fetch("https://api.chucknorris.io/jokes/random");
  let joke = await response.json();
  bot.telegram.sendMessage(ctx.chat.id, joke.value, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "funny 😂",
            callback_data: "funny",
          },
          {
            text: "Not funny 😥",
            callback_data: "not_funny",
          },
        ],
      ],
    },
  });
});

//method that returns thanks message for funny joke

bot.action("funny", (ctx) => {
  bot.telegram.sendMessage(
    ctx.chat.id,
    "Thank you for that. You can try again",
    {}
  );
});

//method that returns sorry message for bad joke

bot.action("not_funny", (ctx) => {
  bot.telegram.sendMessage(
    ctx.chat.id,
    "Sorry for that! but you can try again",
    {}
  );
});

// LAUNCH THE BOT
bot.launch();
