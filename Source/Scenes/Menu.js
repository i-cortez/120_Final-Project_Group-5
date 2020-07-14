// Menu.js
//
// Ismael Cortez
// 7-10-2020
// Group 5 Game
//
// This file contains the code for the menu scene

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
        // preload the background image with the load image function
        this.load.image("background", "Assets/Images/120sbackground.png");

        // load the menu scene music
        this.load.audio("menuTune", "Assets/Sounds/noirintro.wav");
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
            "background" // texture to render with
        ).setOrigin(0, 0);

        let centerX = game.config.width / 2;
        let centerY = game.config.height / 2;
        // vertical space between text boxes
        let vSpace = 64;

        this.add.text
        (
            centerX - 475,
            centerY - 5 * vSpace,
            "Group 5 Game",
            menuConfig
        ).setOrigin(0.5);

        menuConfig.fontSize = "28px";

        this.add.text
        (
            centerX - 475,
            centerY + 1.5 * vSpace,
            "click start to begin",
            menuConfig
        ).setOrigin(0.5);

        this.add.text
        (
            centerX,
            centerY + 5 * vSpace,
            "By: Ismael Cortez, Jennifer Honeywell, Nishaant Pandita",
            menuConfig
        ).setOrigin(0.5);

        this.startButton = this.add.text
        (
            centerX - 475,
            centerY + 2.5 * vSpace,
            "START",
            menuConfig
        ).setOrigin(0.5);
        this.startButton.setInteractive();

        // Adapted from:
        //  https://snowbillr.github.io/blog//2018-07-03-buttons-in-phaser-3/
        //----------------------------------------------------------------------
        this.startButton.on
        (
            "pointerover",
            () =>
            {
                menuConfig.color = "#770000";
                this.startButton.setStyle(menuConfig);
            }
        );

        this.startButton.on
        (
            "pointerout",
            () =>
            {
                menuConfig.color = "#f8f8ff";
                this.startButton.setStyle(menuConfig);
            }
        );
        //----------------------------------------------------------------------

        this.meunMusic = this.sound.add("menuTune");
        this.meunMusic.play(musicConfig);

        this.startButton.on
        (
            "pointerdown",
            () =>
            {
                this.meunMusic.stop();
                menuConfig.color = "#f8f8ff";
                this.scene.start("firstWords");
            }
        );
    }
    //-end create()-------------------------------------------------------------

    update()
    {
        // check for user input
        // switch scenes
    }
}

