// Scene1.js
//
// Ismael Cortez
// 7-10-2020
// Group 5 Game
//
// This file contains the code for Scene 1
//

class Scene1 extends Phaser.Scene
{

    constructor(sound)
    {
        super("missingSocks"); // argument is the identifier for this scene
    }


    preload()
    {
        // load nightstand
        this.load.image("ns_bg","Assets/Images/night_stand_scene.png");

        // load top drawer
        this.load.image("top_d", "Assets/Images/topdrawer_open.png");

        // load bottom drawer
        this.load.image("bottom_d", "Assets/Images/bottomdrawer_open.png");
    }

    create()
    {
        // add background image
        this.background = this.add.image
        (
            0, // horizontal position
            0, // vertical position
            "ns_bg" // texture to render with
        ).setOrigin(0, 0);

        // add top drawer image
        this.background = this.add.image
        (
            0,
            0,
            "top_d"
        ).setOrigin(0, 0);

        menuConfig.fontSize = "20px";
        this.sceneText = this.add.text
        (
            640,
            200,
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
                this.scene.start("roughWorld");
            }
        );
    }

    update()
    {
        // hi
    }
    
    getText()
    {
        let cutText = "I knock a couple times on the door but there’s no" +
        "\nsound coming from inside. After waiting a bit my patience ran" +
        "\nout, I try to open the door and found it unlocked. The place was" +
        "\na mess, it seemed like someone scrambled to leave or maybe..." +
        "\nsomeone had tossed the place looking for something and I already" +
        "\nhad a suspect in mind…";

        return cutText;
    }
}