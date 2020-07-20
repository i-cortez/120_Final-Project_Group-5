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
    // debug scene: [Scene1]
    scene: [Menu, Scene0, Scene1, Scene2, Scene3, Scene4, Scene5]
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

let musicConfig =
{
    mute: false,
    volume: 1,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: true,
    delay: 0
};

let colorPalette =
{
    redStr: "#770000",
    redInt: 0x770000,
    blueStr: "#dadfff",
    blueInt: 0xdadfff,
    greyStr: "#f8f8ff",
    greyInt: 0xf8f8ff
};

// dialogue constants
DBOX_X = 0; // dialogue box x-pos
DBOX_Y = 400; // y-pos
DBOX_FONT = "gem_font"; // font key

TEXT_X = 50; // text w/in dialogue box x-pos
TEXT_Y = 445; // text w/in dialogue box y-pos
TEXT_SIZE = 24; // text font size (in pixels)
TEXT_MAX_WIDTH = 715; // max width of text within box

NEXT_TEXT = "[SPACE]"; // text to display for next prompt
NEXT_X = 775; // next text prompt x-pos
NEXT_Y = 574; // next text prompt y-pos

LETTER_TIMER = 10; // num of ms each leter takes to write

// dialogue variables
dialogueConvo = 0; // current conversation
dialogueLine = 0; // curent line of conversation
dialogueSpeaker = null; // current speaker
dialogueLastSpeaker = null; // former speaker
dialogueTyping = false; // flag to lock player input while writing
dialogueText = null; // the text to display
nextText = null; // player prompt text to continue typing
eof = false;