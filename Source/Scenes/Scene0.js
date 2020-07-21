// Scene0.js
//
// Ismael Cortez
// 7-10-2020
// Group 5 Game
//
// This file contains the code for Scene 0: Rough and Tumble World Monologue
//

class Scene0 extends Phaser.Scene
{

    constructor()
    {
        super("firstWords"); // argument is the identifier for this scene
    }

    preload()
    {
        // set the loader path for images
        this.load.path = "./Assets/Images/Backgrounds/";

        // preload the background images
        this.load.image("background_1", "background_1.png");
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

        this.scene.launch("conversation", {file: "scene0A.json"});

        menuConfig.fontSize = "28px";
        this.continue = this.add.text
        (
            1100,
            20,
            "[click to end scene]",
            menuConfig
        ).setOrigin(0.5).setInteractive();

        this.continue.on
        (
            "pointerover",
            () =>
            {
                menuConfig.color = "#770000";
                this.continue.setStyle(menuConfig);
            }
        );

        this.continue.on
        (
            "pointerout",
            () =>
            {
                menuConfig.color = colorPalette.purpleStr;
                this.continue.setStyle(menuConfig);
            }
        );

        this.continue.on
        (
            "pointerdown",
            () =>
            {
                menuConfig.color = colorPalette.purpleStr;
                this.continue.removeInteractive();
                this.scene.start("missingSocks");
            }
        );
    }

    update()
    {
        // hi
    }
}

