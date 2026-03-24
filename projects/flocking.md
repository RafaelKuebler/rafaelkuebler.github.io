---
title: Flocking Simulation
description: 2D emergent flocking behaviour in Unity3D using Craig Reynolds' boids algorithm.
github: https://github.com/RafaelKuebler/Flocking
---

A 2D simulation of Craig Reynolds' classic [boids algorithm](https://en.wikipedia.org/wiki/Boids) built in Unity3D, where hundreds of independent agents produce lifelike flocking behaviour from just three simple rules.

## The Rules

Each boid looks at its neighbours and applies three steering forces:

1. **Separation** – steer away from boids that are too close to avoid crowding.
2. **Alignment** – steer towards the average heading of nearby boids.
3. **Cohesion** – steer towards the average position of nearby boids to stay with the flock.

No boid has any global knowledge of the flock. The emergent group behaviour – splitting around obstacles, reforming, spiralling – arises entirely from these local interactions.

## Implementation

Built in Unity3D with C#. Inspired by the Processing flocking example by Daniel Shiffman.
