// Scene11.js
//
// Ismael Cortez
// 7-10-2020
// Group 5 Game
//
// This file contains the code for the last scene
//

class Scene11 extends Phaser.Scene
{
    constructor()
    {
        super("theEnd");
    }

    create()
    {
        this.text0 = this.add.bitmapText
        (
            640, // x-coord
            360, // y-coord
            "scene_font", // bitmap font
            "Thanks for playing!", // text to disply
            49 // font size
        ).setOrigin(0.5);

        this.text1 = this.add.bitmapText
        (
            640, // x-coord
            480, // y-coord
            "scene_font", // bitmap font
            "[Main Menu]", // text to disply
            36 // font size
        ).setOrigin(0.5).setInteractive().setTint(colorPalette.purpleInt);

        this.text2 = this.add.bitmapText
        (
            640,
            240,
            "scene_font",
            "The End",
            64
        ).setOrigin(0.5);

        this.text1.on
        (
            "pointerover",
            () => 
            {
                this.text1.tint = colorPalette.goldInt;
                this.sound.play(getRandSFX(), sfxConfig);
            }
        );

        this.text1.on
        (
            "pointerout",
            () => {this.text1.tint = colorPalette.purpleInt;}
        );

        this.text1.on
        (
            "pointerdown",
            () => 
            {
                this.scene.start("menuScene");
                this.sound.stopByKey("piano_song_1");
            }
        );
    }
}

