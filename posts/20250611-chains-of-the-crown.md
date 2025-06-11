---
title: Chains of the Crown
date: 2025-05-11
layout: post.njk
tags:
  - post
---


I have been pretty caught up the past days with a small GameDev project of mine. The name I have decided to give it for now is *Chains of the Crown*.

Though I dream of having some sort of artistic talent sometimes, I have to admit that asset creation was never my strong suit. I dabbled here and there for some years creating my own clunky-looking Blender robots back when I was 15, but that is pretty much as far as I got.
Luckily, kind-hearted people on the Internet exist, and publish their work for free!
Scrolling through itch.io, I discovered [a beautiful isometric tileset](https://scrabling.itch.io/pixel-isometric-tiles). A few more minutes of research and more pixel art assets popped up. In this case, [some cute medieval characters](https://lyaseek.itch.io/minifhumans).

I have long been a huge fan of the XCOM franchise. Could I ever hope to create something like this? In any case, even if I don't finish, what is the harm in starting and learning something along the way?

So here is the current, still very raw state! *Chains of the Crown* is a turn-based tactical combat game, in which your character, a knight fallen from the grace of the King, joins the farmers to overthrow their repressing ruler. One thing I am especially proud of is the conservation of the axis-aligned pixel art! You see, I wanted the game to look like the screenshots of the isometric tileset I found, which includes tiles at different elevations.
At first I went the 2D route and used the tileset as it is intended: on a plat plane that only simulates depth. But placing a unit behind an elevation instantly led to a bad UX. How could you tell where your units where, at what depth, and what other places they could reach if you could not see anything behind a sufficiently high hill?

After some brainstorming I found the solution!
The 2D tiles are placed on 3D positions, but "billboard" to always face the camera. With smart placement of the orthogonal camera, the scene looks flat and the pixels are still axis-aligned, without any gaps between them! 🥳 This approach allows pivoting the camera to face the scene from one of four possible angles at which the effect is preserved. While the tiles glitch into each other on rotation, in my opinion the fast camera movement creates a believable effect that even has its very own and unique(?) charm.

There is a GIF to show the current progress!

![Chains of the Crown Work-In-Progress](/media/chains_of_the_crown.gif)
