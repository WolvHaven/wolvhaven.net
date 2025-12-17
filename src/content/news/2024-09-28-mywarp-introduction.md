---
title: "Hello to MyWarp!"
description: "The long awaited player-created warp signs are finally here!"
pubDate: "2024-09-28"
heroImage: "/post-content/2024-mywarp.png"
---

## A new plugin to create warp signs

Hi WolvHaveners! The long awaited MyWarp plugin has just been implemented! This means players can create their own warps for use on warp signs on the server's creative worlds.

## How does it work?

Full documentation is available on the <a href="https://github.com/MyWarp/MyWarp/wiki" target="_blank">plugin's GitHub</a>, but here is the main gist of things.

### 1. Create a warp
```/mywarp create [warp name]``` This is your **destination warp**. Aka, where the warp sign will teleport players to.

There is no mandatory warp naming scheme but I'd advise you to keep things neat and organised. For instance, `World-Company-Location`. Here's an example: ```/mywarp create CA-PB-X10_Perfectshire```.

Note that players **[PR]** and above can only create warps in **Calidia** and **Gardellia** whilst those who hold the **[Builder]**, **[Architect]** or **[Engineer]** ranks can create warps in **FifthHaven**.

### 2. Create a warp sign
Now it's time to place your warp sign where places can warp from to the destination you just created. Place a sign with the following format: <br>
*line 1:* ```blank``` <br>
*line 2:* ```[MyWarp]``` <br>
*Line 3:* ```Warp Name``` <br>
*line 4:* ```blank```

And that's it! Just right click the sign to use the warp.

## Useful commands
```/mywarp delete [warp name]``` or ```/mywarp remove [warp name]``` - Deletes the warp. <br>
```/mywarp update [warp name]``` - Updates the warp location to the player's current position. <br>
```/mywarp welcome [warp name]``` - Changes the welcome message of the warp. <br>
```/mywarp assets``` - Lists your warps.

*MatthieuTofu*