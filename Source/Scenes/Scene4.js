// Scene3.js
//
// Ismael Cortez
// 7-10-2020
// Group 5 Game
//
// This file contains the code for Scene 3: The Mothfia
//

class Scene4 extends Phaser.Scene
{
    constructor()
    {
        super("mothfia");
    }

    preload()
    {
        // set the loader path
        this.load.path = "./Assets/Images/";

        // load the background image
        this.load.image("background_4","Backgrounds/background_4.png");

        // load the mothfather
        this.load.image("mothfather", "Characters/mothfather_0.png");
    }

    create()
    {
        // add background image
        this.background = this.add.image
        (
            0, // horizontal position
            0, // vertical position
            "s3Background" // texture to render with
        ).setOrigin(0, 0);

        this.mothfather = this.add.image
        (
            13,
            234,
            "mothfather"
        ).setOrigin(0).setInteractive();
        this.mothfather.tint = colorPalette.purpleInt;

        // interactive events for mothfather
        this.mothfather.on
        (
            "pointerover",
            () => {this.mothfather.tint = colorPalette.goldInt;}
        );

        this.mothfather.on
        (
            "pointerout",
            () => {this.mothfather.tint = colorPalette.purpleInt;}
        );

        this.mothfather.on
        (
            "pointerdown",
            () => 
            {
                this.mothfather.clearTint();
                this.mothfather.removeInteractive();
                this.scene.start("theDiner");
            }
        );
    }
}

