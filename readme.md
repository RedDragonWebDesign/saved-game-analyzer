# Saved Game Analyzer

## Description

Web tool to reverse engineer saved game files. For games that use SIMPLE, BINARY saved game formats. This tool will do diffs, labeling, etc.

Tool 1 is a tool to create a saved game structure file. It has a diff tool so you can save a game, change one setting, save it as a different file, then compare the 2 files so that you can see what asetting changed. Then this tool lets you label that spot, and adds it to your structure file.

Tool 2 is a tool that loads structure files, then lets you create your own saved games.

## Motivation

I wanted to learn low level programming, CPU architecture, reverse engineering, assembly, etc. But I was looking for a fun goal to help motivate myself.

So I picked an old DOS game that I liked, but that was pretty obscure. I picked Gold Of The Americas (1989). It's so obscure that there aren't even any online walkthroughs or strategy guides.

But you know what? It has a save game feature. That saves in a simple, unencrypted, uncompressed, binary format.

Time to make a tool!

## Screenshots

