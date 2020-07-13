// main.js
//
// Ismael Cortez
// 7-10-2020
// Group 5 Game
//
// This file contains the code for the game object
//
const config =
{
    parent: "phaser-game",
    type: Phaser.Auto,
    width: 1280,
    height: 720,
    scene: [Menu]
};

// define game
let game = new Phaser.Game(config);

// menu text config
let menuConfig =
{
    fontFamily: "Comic Sans MS",
    fontSize: "36px",
    // backgroundColor: "#002b36",
    color: "#f8f8ff",
    align: "center",
    padding:
    {
        top: 5,
        bottom: 5
    },
    fixedWidth: 0
};


