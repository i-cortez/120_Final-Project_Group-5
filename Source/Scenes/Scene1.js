// Scene1.js
//
// Ismael Cortez
// 7-10-2020
// Group 5 Game
//
// This file contains the code for Scene 1: Socks Are Gone!
// This scene uses Convo.js
//

class Scene1 extends Phaser.Scene
{

    constructor()
    {
        // argument is the identifier for this scene
        super("missingSocks");

        // scene dialogue variables
        this.dialogueA = false;
        this.dialogueB = false;
    }

    preload()
    {
        // set the loader path
        this.load.path = "./Assets/Images/";

        // load images
        this.load.image("background_2","Backgrounds/background_2.png");
        this.load.image("drawer_u_0","Cutouts/drawer_u_0.png");
        this.load.image("drawer_b_0","Cutouts/drawer_b_0.png");
        this.load.image("drawer_u_1","Cutouts/drawer_u_1.png");
        this.load.image("drawer_b_1","Cutouts/drawer_b_1.png");
        
        // load sounds
        this.load.path = "./Assets/Sounds/SFX/";
        this.load.audio("knock_sfx", "knock.wav");
        this.load.audio("open_sfx", "drawer_open.wav");
        this.load.audio("close_sfx", "drawer_close.wav");
    }

    //--------------------------------------------------------------------------
    // CREATE
    //--------------------------------------------------------------------------
    create()
    {
        // IMAGES
        //----------------------------------------------------------------------
        // background image
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

        // SOUNDS
        //----------------------------------------------------------------------
        // add SFX
        this.sound.add("knock_sfx");
        this.sound.add("open_sfx");
        this.sound.add("close_sfx");

        // INTERACTIVE IMAGES
        //----------------------------------------------------------------------
        // top drawer
        this.topD.on
        (
            "pointerover",
            () =>
            {
                this.topD.tint = colorPalette.goldInt;
                this.sound.play(getRandSFX(), sfxConfig);
            }
        );

        this.topD.on
        (
            "pointerout",
            () => {this.topD.tint = colorPalette.purpleInt;}
        );

        this.topD.on
        (
            "pointerdown",
            () =>
            {
                this.topD.clearTint();
                this.bottomD.clearTint();
                this.topD.removeInteractive();
                this.bottomD.removeInteractive();
                this.sound.play("knock_sfx", sfxConfig);
                this.time.delayedCall
                (
                    2000, // time in ms
                    () =>
                    {
                        this.topD.destroy();
                        this.sound.play("open_sfx", sfxConfig);
                        this.openTopD = this.add.image
                        (
                            340, // horizontal position
                            240, // vertical position
                            "drawer_u_1"
                        ).setOrigin(0, 0);
                        this.scene.launch
                        (
                            "conversation",
                            {file: "scene1A.json"}
                        );
                    } // callback
                );
                this.dialogueB = true;
            }
        );

        // bottom drawer
        this.bottomD.on
        (
            "pointerover",
            () =>
            {
                this.bottomD.tint = colorPalette.goldInt;
                this.sound.play(getRandSFX(), sfxConfig);
            }
        );

        this.bottomD.on
        (
            "pointerout",
            () => {this.bottomD.tint = colorPalette.purpleInt;}
        );

        this.bottomD.on
        (
            "pointerdown",
            () =>
            {
                this.bottomD.clearTint();
                this.topD.clearTint();
                this.bottomD.removeInteractive();
                this.topD.disableInteractive();
                this.sound.play("knock_sfx", sfxConfig);
                this.time.delayedCall
                (
                    2000, // time in ms
                    () =>
                    {
                        this.sound.play("open_sfx", sfxConfig);
                        this.bottomD.alpha = 0;
                        this.openBottomD = this.add.image
                        (
                            414, // horizontal position
                            520, // vertical position
                            "drawer_b_1"
                        ).setOrigin(0, 0);
                        this.scene.launch
                        (
                            "conversation",
                            {file: "scene1B.json"}
                        );
                    } // callback
                );
                this.dialogueA = true;
            }
        );
    }
    //-end create()-------------------------------------------------------------

    update()
    {
        if(this.dialogueA && dialogueComplete)
        {
            console.log("refresh dialogue");
            this.dialogueA = false;
            this.refreshA();
        }

        if(this.dialogueB && dialogueComplete)
        {
            console.log("ending scene");
            this.dialogueB = false;
            this.endOnB();
        }
    }

    refreshA()
    {
        dialogueComplete = false;
        this.openBottomD.destroy();
        this.topD.setInteractive();
        this.topD.tint = colorPalette.purpleInt;
        this.bottomD.alpha = 1;
    }

    endOnB()
    {
        dialogueComplete = false;
        this.time.delayedCall
        (
            400,
            () => 
            {
                this.sound.stopByKey("menu_song");
                this.scene.start("roughWorld");
            }
        );
    }
}

