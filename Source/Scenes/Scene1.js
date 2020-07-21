// Scene1.js
//
// Ismael Cortez
// 7-10-2020
// Group 5 Game
//
// This file contains the code for Scene 1: Socks Are Gone!
//

class Scene1 extends Phaser.Scene
{

    constructor()
    {
        super("missingSocks"); // argument is the identifier for this scene

    }

    preload()
    {
        // remove prior cache if it exists
        this.cache.json.remove("dialogue");

        // set the loader path
        this.load.path = "./Assets/Images/";

        // load nightstand
        this.load.image("background_2","Backgrounds/background_2.png");

        // load the drawers
        this.load.image("drawer_u_0","Cutouts/drawer_u_0.png");
        this.load.image("drawer_b_0","Cutouts/drawer_b_0.png");
        this.load.image("drawer_u_1","Cutouts/drawer_u_1.png");
        this.load.image("drawer_b_1","Cutouts/drawer_b_1.png");
        
        // load SFX
        this.load.path = "./Assets/Sounds/";
        this.load.audio("over_sfx", "notification.wav");
        this.load.audio("knock_sfx", "knock.wav");
        this.load.audio("open_sfx", "DrawerOpen.wav");
        this.load.audio("close_sfx", "DrawerClose.wav")
    }

    create()
    {
        // add background image
        this.background = this.add.image
        (
            0, // horizontal position
            0, // vertical position
            "background_2" // texture to render with
        ).setOrigin(0, 0);

        // add top drawer sprite
        this.topD = this.add.image
        (
            340, // horizontal position
            240, // vertical position
            "drawer_u_0"
        ).setOrigin(0, 0).setInteractive();
        this.topD.tint = colorPalette.purpleInt;

        // add top drawer sprite
        this.bottomD = this.add.image
        (
            414, // horizontal position
            520, // vertical position
            "drawer_b_0"
        ).setOrigin(0, 0).setInteractive();
        this.bottomD.tint = colorPalette.purpleInt;

        this.overSFX = this.sound.add("over_sfx");
        this.knockSFX = this.sound.add("knock_sfx");
        this.openSFX = this.sound.add("open_sfx");

        // check for pointer over object
        this.topD.on
        (
            "pointerover",
            () =>
            {
                // this.topD.setFrame(1);
                this.topD.tint = colorPalette.goldInt;
                this.overSFX.play(sfxConfig);
                console.log("pointerover");
            }
        );

        // check for pointer leaving object
        this.topD.on
        (
            "pointerout",
            () =>
            {
                // this.topD.setFrame(0);
                this.topD.tint = colorPalette.purpleInt;
                console.log("pointerout");
            }
        );

        this.topD.on
        (
            "pointerdown",
            () =>
            {
                console.log("pointerdown");
                this.topD.clearTint();
                this.topD.removeInteractive();
                this.knockSFX.play(sfxConfig);
                this.time.delayedCall
                (
                    2000, // time in ms
                    () =>
                    {
                        this.topD.destroy();
                        this.openSFX.play(sfxConfig);
                        this.openTopD = this.add.image
                        (
                            340, // horizontal position
                            240, // vertical position
                            "drawer_u_1"
                        ).setOrigin(0, 0);
                    } // callback
                );
                this.scene.launch("conversation", {file: "scene1A.json"});
                this.closeScene();
            }
        );
    }

    update()
    {
        // hi
    }

    closeScene()
    {
        menuConfig.fontSize = "28px";
        this.continue = this.add.text
        (
            1100,
            40,
            "[click to end scene]",
            menuConfig
        ).setOrigin(0.5).setInteractive();

        this.continue.on
        (
            "pointerover",
            () =>
            {
                menuConfig.color = colorPalette.redStr;
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
                this.scene.start("roughWorld");
                this.sound.stopByKey("menuTune");
            }
        );
    }
}

