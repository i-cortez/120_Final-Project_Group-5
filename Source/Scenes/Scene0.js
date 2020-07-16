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

    constructor(sound)
    {
        super("firstWords"); // argument is the identifier for this scene
    }

    preload()
    {
        // load the fog image
        this.load.image("fog", "Assets/Images/fog.png");
    }

    create()
    {
        // add background image
        this.background = this.add.image
        (
            0, // horizontal position
            0, // vertical position
            "background" // texture to render with
        ).setOrigin(0, 0);

        // add the fog
        this.fog = this.add.tileSprite
        (
            0,
            0,
            config.width,
            config.height,
            "fog",
        ).setOrigin(0, 0).setAlpha(0.6);

        menuConfig.fontSize = "20px";
        this.sceneText = this.add.text
        (
            640,
            360,
            this.getText(),
            menuConfig
        ).setOrigin(0.5);

        menuConfig.fontSize = "28px";
        this.continue = this.add.text
        (
            960,
            540,
            "Continue...",
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
                menuConfig.color = "#f8f8ff";
                this.continue.setStyle(menuConfig);
            }
        );

        this.continue.on
        (
            "pointerdown",
            () =>
            {
                menuConfig.color = "#f8f8ff";
                this.scene.start("missingSocks");
            }
        );
    }

    update()
    {
        this.fog.tilePositionX -= 1;
    }
    
    getText()
    {
        let cutText = "It’s going to be a cold day today...in Cooltown," +
            "\nCalifornia. I don’t hate the cold but I hate the fog that" +
            "\nrolls in, it covers the ugliness in the city, it obscures the" +
            "\ntruth and as a private eye the truth is how I put bread on the" +
            "\ntable and soda in my cup. But now that I don’t have a case" +
            "\ntoday I’m seeing my partner, and I don’t mean an investigation" +
            "\naide. Let’s see if we can reach before the fog makes driving" +
            "\n a hassle.";

        return cutText;
    }
}

