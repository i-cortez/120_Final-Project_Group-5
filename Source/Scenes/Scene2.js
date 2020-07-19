// Scene2.js
//
// Ismael Cortez
// 7-10-2020
// Group 5 Game
//
// This file contains the code for Scene 2: The Room
//

class Scene2 extends Phaser.Scene
{
    constructor()
    {
        super("roughWorld"); // argument is the identifier for this scene
    }

    preload()
    {
        // set the loader path
        this.load.path = "./Assets/";

        // load the background image
        this.load.image
        (
            "s2Background","Images/Backgrounds/background_3.png"
        );

        // load the nightstand spritesheet
        this.load.image
        (
            "nightstand",
            "Images/Cutouts/nightstand.png",
        );

        // load the menu scene music
        this.load.audio("cityTune", "Sounds/fog_city.wav");
    }

    create()
    {
        // add background image
        this.background = this.add.image
        (
            0, // horizontal position
            0, // vertical position
            "s2Background" // texture to render with
        ).setOrigin(0, 0);

        // add the nightstand sprite
        this.nightstand = this.add.image
        (
            320, // horizontal position
            160, // vertical position
            "nightstand" // texture to render with 
        ).setOrigin(0, 0).setInteractive();
        this.nightstand.tint = 0x770000;

        // add the fog
        this.fog = this.add.tileSprite
        (
            0,
            0,
            config.width,
            config.height,
            "fog",
        ).setOrigin(0, 0).setAlpha(0.6);

        // check for pointer over object
        this.nightstand.on
        (
            "pointerover",
            () => 
            {
                // this.nightstand.setFrame(1);
                this.nightstand.tint = 0xffdf00;
            }
        );

        // check for pointer leaving object
        this.nightstand.on
        (
            "pointerout",
            () =>
            {
                // this.nightstand.setFrame(0);
                this.nightstand.tint = 0x770000;

            }
        );

        this.nightstand.on
        (
            "pointerdown",
            () =>
            {
                this.nightstand.removeInteractive();
                this.sound.stopByKey("cityTune");
                this.scene.start("mothfia");
            }
        );

        this.cityMusic = this.sound.add("cityTune");
        this.cityMusic.play(musicConfig);
    }

    update()
    {
        // move the fog across the screen
        this.fog.tilePositionX -= 1;
    }
}

