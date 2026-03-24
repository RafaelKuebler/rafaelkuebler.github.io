---
title: GoSenseiBot
description: A Telegram bot that lets you play the board game Go in any chat, rendering the board after every move.
github: https://github.com/RafaelKuebler/GoBot
---

A Telegram bot (@GoSenseiBot) that brings the ancient board game [Go](https://en.wikipedia.org/wiki/Go_(game)) into any Telegram chat. Players issue simple commands and the bot responds with a freshly rendered image of the board.

## How it works

Start a game and place stones with slash commands:

```
/place a4
/place q16
```

After each move the bot renders the current board state as an image using Pillow and posts it back to the chat, so everyone can see the position at a glance.

## Stack

- **Python 3** with the Telegram Bot API wrapper
- **Pillow** for board image generation
- **Docker** for deployment
- Originally hosted on Heroku for 24/7 availability
