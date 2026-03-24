---
title: Delaunay Triangulation & Voronoi Diagrams
description: C# implementation of the Bowyer–Watson algorithm for Delaunay triangulation and Voronoi diagram generation.
github: https://github.com/RafaelKuebler/DelaunayVoronoi
---

A C# implementation of the [Bowyer–Watson algorithm](https://en.wikipedia.org/wiki/Bowyer%E2%80%93Watson_algorithm) that computes Delaunay triangulations and their dual Voronoi diagrams from a set of randomly distributed points.

## What is it?

Given a set of points in 2D space, the algorithm produces:

- A **Delaunay triangulation** – a triangulation where no point lies inside the circumcircle of any triangle, maximising the minimum angle and avoiding sliver triangles.
- A **Voronoi diagram** – the dual graph of the triangulation, partitioning the plane into regions where each region contains all points closest to one input point.

Both structures are fundamental in computational geometry and appear everywhere from procedural terrain generation to cell simulations.

## Why C#?

The implementation targets C# to make it straightforward to port into the Unity game engine for use in procedural generation projects.

## Performance

The visualisation runs comfortably with **5 000 points** in real time using a WPF canvas for rendering.
