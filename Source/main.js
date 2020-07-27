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
    scene: [Menu, Scene0, Scene1, Scene2, Scene3, Scene4, Scene5, Scene6, Scene7, Scene8, Scene9, Scene10, Scene11, Convo]
};

// define game
let game = new Phaser.Game(config);

let musicConfig =
{
    mute: false,
    volume: 0.5,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: true,
    delay: 0
};

let sfxConfig =
{
    mute: false,
    volume: 0.9,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: false,
    delay: 0
};

let colorPalette =
{
    redStr: "#770000",
    redInt: 0x770000,
    blueStr: "#dadfff",
    blueInt: 0xdadfff,
    greyStr: "#f8f8ff",
    greyInt: 0xf8f8ff,
    goldStr: "#ffdf00",
    goldInt: 0xffdf00,
    purpleStr: "#efd5ff",
    purpleInt: 0xefd5ff
};

let dialogueComplete = false;

function getRandSFX()
{
    let sfx = ["over_sfx_0", "over_sfx_1"];
    let x = Math.floor(Math.random() * 2);
    let str = sfx[x];
    return str;
}

