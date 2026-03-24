---
title: PlantUML Design Patterns
description: All 23 GoF design patterns as PlantUML diagrams, with a Python script to render them all at once.
github: https://github.com/RafaelKuebler/PlantUMLDesignPatterns
---

UML diagrams for all 23 Gang of Four design patterns, written in [PlantUML](https://plantuml.com/) and accompanied by a small Python script that batch-renders every diagram to an image.

## Patterns covered

**Creational (5):** Abstract Factory, Builder, Factory Method, Prototype, Singleton

**Structural (7):** Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy

**Behavioral (11):** Chain of Responsibility, Command, Interpreter, Iterator, Mediator, Memento, Observer, State, Strategy, Template Method, Visitor

## Usage

```bash
python run.py
```

Diagrams are generated into the `output/` folder. Requires Java, Graphviz, and the PlantUML JAR.

## Why?

Having all 23 patterns in a single consistent notation makes them easy to compare and review. The diagrams are based on Jason McDonald's design patterns cheat sheet.
