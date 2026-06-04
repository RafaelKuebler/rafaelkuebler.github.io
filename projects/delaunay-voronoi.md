---
title: Delaunay Triangulation & Voronoi Diagrams
description: C# implementation of the Bowyer–Watson algorithm for Delaunay triangulation and Voronoi diagram generation.
github: https://github.com/RafaelKuebler/DelaunayVoronoi
---

I started this project during one of those moments of productive procrastrination. It was the exam phase at university and of course slacking off and playing some video games was not a real option. That would not avoid the guilt. But implementing Delaunay triangulations and their Voronoi diagrams would!

Since I was doing a lot with C# in the Unity game engine at the time, I decided to go with that. First algorithm that showed up on the Internet: [Bowyer–Watson](https://en.wikipedia.org/wiki/Bowyer%E2%80%93Watson_algorithm).
I wrapped up the initial implementation quite fast!

However, I observed an interesting problem in which three points that were almost in a line and belonged to one triangle would lead to a massive circumcircle. This circumcircle would lie outside of the bounds defined by the supertriangle. In theory, one way to solve this is to use symbolic vertices for the supertriangle that reach into infinity: (−∞,−∞), (0,∞), and (∞,0).
I chickened out 🤷‍♂️ Instead of fixing the problem, the program initially generates 4 bounding box vertices and directly hard-codes the two implied triangles. The algorithm then skips generating a supertriangle entirely, and instead starts from these borders. The problem never arises.

One scenario that might still break everything is when three points are exactly in line. Thankfully, with the current RNG generation method, this is highly unlikely.

The hope was to eventually use this in some video game. Maybe to procedurally generate terrain? Even found some awesome tutorials out there (see [Voronoi maps tutorial](https://www.redblobgames.com/x/2022-voronoi-maps-tutorial/)). Well, I never got to it...
But the repository accumulated more than 100 stars on GitHub and even got some contributions! Would have never guessed!
