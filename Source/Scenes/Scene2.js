// Scene2.js
//
// Ismael Cortez
// 7-10-2020
// Group 5 Game
//
// This file contains the code for Scene 2
//

class Scene2 extends Phaser.Scene
{
    constructor()
    {
        super("roughWorld"); // argument is the identifier for this scene
    }

    preload()
    {

        // load the background image
        this.load.image
        (
            "background_1","Assets/Images/120sbackground_nofog.png"
        );

        // load the nightstand spritesheet
        this.load.spritesheet
        (
            "nightstand",
            "Assets/Images/nightstand_spritesheet.png",
            {frameWidth: 155, frameHeight: 335}
        );

        // load the menu scene music
        this.load.audio("cityTune", "Assets/Sounds/fog_city.wav");

    }

    create()
    {
        // add background image
        this.background = this.add.image
        (
            0, // horizontal position
            0, // vertical position
            "background_1" // texture to render with
        ).setOrigin(0, 0);

        // add the nightstand sprite
        this.nightstand = this.add.sprite
        (
            320, // horizontal position
            140, // vertical position
            "nightstand" // texture to render with 
        ).setOrigin(0, 0).setFrame(0).setInteractive();

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
            () => {this.nightstand.setFrame(1);}
        );

        // check for pointer leaving object
        this.nightstand.on
        (
            "pointerout",
            () => {this.nightstand.setFrame(0);}
        );

        this.cityMusic = this.sound.add("cityTune");
        this.cityMusic.play(musicConfig);
        
    }

    update()
    {
        // hi

        this.fog.tilePositionX -= 1;
    }
}

