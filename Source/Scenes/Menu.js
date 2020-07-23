// Menu.js
//
// Ismael Cortez
// 7-10-2020
// Group 5 Game
//
// This file contains the code for the Menu Screen
//

class Menu extends Phaser.Scene
{
    constructor()
    {
        // argument is the identifier for this scene
        super("menuScene");
    }

    // Phaser scenes are controlled by the following flow of functions
    // first the init() function is used to prepare data
    // the preload() function is used to load music and images
    // the create() function is used to add objects to the game
    // the update() is a loop that runs constantly

    preload()
    {
        // set the loader path
        this.load.path = "./Assets/";
        // preload the background image with the load image function
        this.load.image
        (
            "background_0",
            "Images/Backgrounds/background_0.png"
        );
        this.load.image("start", "Images/Cutouts/start.png");
        // load the menu scene music
        this.load.audio("menuTune", "Sounds/noirintro.wav");
    }

    //--------------------------------------------------------------------------
    // CREATE
    //--------------------------------------------------------------------------
    create()
    {
        // add background image
        this.background = this.add.image
        (
            0, // horizontal position
            0, // vertical position
            "background_0" // texture to render with
        ).setOrigin(0, 0);

        let centerX = game.config.width / 2;
        let centerY = game.config.height / 2;

        this.startButton = this.add.image
        (
            centerX - 100,
            centerY + 200,
            "start"
        ).setOrigin(0.5).setInteractive().setTint(colorPalette.purpleInt);

        // INTERACTIVE IMAGE
        // Start button
        //----------------------------------------------------------------------
        this.startButton.on
        (
            "pointerover",
            () => {this.startButton.tint = colorPalette.goldInt;}
        );

        this.startButton.on
        (
            "pointerout",
            () => {this.startButton.tint = colorPalette.purpleInt;}
        );

        this.startButton.on
        (
            "pointerdown",
            () =>
            {
                this.startButton.clearTint();
                this.startButton.removeInteractive();
                this.scene.start("firstWords");
            }
        );
        //-END INTERACTIVE------------------------------------------------------

        this.meunMusic = this.sound.add("menuTune");
        this.meunMusic.play(musicConfig);

        // to get music to play click on the screen once :(
        this.input.on
        (
            "pointerdown",
            () =>
            {
                if(game.sound.context.state === 'suspended')
                {
                    game.sound.context.resume();
                }
            }
        );
    }
    //-end create()-------------------------------------------------------------
}

