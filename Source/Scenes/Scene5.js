// Scene5.js
//
// Ismael Cortez
// 7-10-2020
// Group 5 Game
//
// This file contains the code for Scene 5: Officer Beary
//

class Scene5 extends Phaser.Scene
{
    constructor()
    {
        super("theDiner");
    }

    preload()
    {
        // set the loader path
        this.load.path = "./Assets/Images/";

        // load the background image
        this.load.image("s4Background","Backgrounds/background_5.png");

        // load officer beary
        this.load.image("beary", "Characters/beary_1.png");
    }

    create()
    {
        // add background image
        this.background = this.add.image
        (
            0, // horizontal position
            0, // vertical position
            "s4Background" // texture to render with
        ).setOrigin(0, 0);

        this.beary = this.add.image
        (
            192,
            81,
            "beary"
        ).setOrigin(0).setInteractive();
        this.beary.tint = colorPalette.purpleInt;

        // interactive events for officer beary
        this.beary.on
        (
            "pointerover",
            () => {this.beary.tint = colorPalette.goldInt;}
        );

        this.beary.on
        (
            "pointerout",
            () => {this.beary.tint = colorPalette.purpleInt;}
        );

        this.beary.on
        (
            "pointerdown",
            () => 
            {
                this.beary.clearTint();
                this.beary.removeInteractive();
                this.scene.start("intermission");
            }
        );
    }
}

