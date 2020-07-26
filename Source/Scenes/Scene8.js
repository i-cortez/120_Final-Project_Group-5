// Scene8.js
//
// Ismael Cortez
// 7-10-2020
// Group 5 Game
//
// This file contains the code for Scene 8: Sheila
// This scene uses Convo.js
//

class Scene8 extends Phaser.Scene
{
    constructor()
    {
        super("sheila");

        // dialogue variables
        this.dialogueA = false;
        this.dialogueB = false;

        // scene logic variables
        this.choice0 = false;
        this.choice1 = false;
    }

    preload()
    {
        // set the loader path
        this.load.path = "./Assets/";

        // load images
        this.load.image("background_8", "Images/Backgrounds/background_8.png");
        this.load.image("scene8_fog", "Images/Backgrounds/still_fog.png");
        this.load.image("sheila_0", "Images/Characters/sheila_0.png");

        // load font
        this.load.bitmapFont("scene_font", "/Fonts/gem.png", "Fonts/gem.xml");
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
            "background_8" // texture to render with
        ).setOrigin(0);

        // add the sock
        this.sock0 = this.add.image
        (
            125,
            260,
            "sheila_0"
        ).setOrigin(0);

        this.fog = this.add.image
        (
            0,
            0,
            "scene8_fog"
        ).setOrigin(0).setAlpha(0);

        this.text0 = this.add.bitmapText
        (
            320, // x-coord
            600, // y-coord
            "scene_font", // bitmap font
            "Let her go", // text to disply
            36 // font size
        ).setOrigin(0.5).setTint(colorPalette.purpleInt).setAlpha(0);
        
        this.text1 = this.add.bitmapText
        (
            960, // x-coord
            600, // y-coord
            "scene_font", // bitmap font
            "Tell her to stay", // text to disply
            36 // font size
        ).setOrigin(0.5).setTint(colorPalette.purpleInt).setAlpha(0);

        this.text2 = this.add.bitmapText
        (
            640, // x-coord
            360, // y-coord
            "scene_font", // bitmap font
            "Now comes the big decision...", // text to disply
            49 // font size
        ).setOrigin(0.5).setAlpha(0);

        // INTERACTIVE IMAGES
        //----------------------------------------------------------------------
        // the socks
        this.sock0.on
        (
            "pointerover",
            () => 
            {
                this.sock0.tint = colorPalette.goldInt;
                this.sound.play("over_sfx_1", sfxConfig);
            }
        );

        this.sock0.on
        (
            "pointerout",
            () => {this.sock0.tint = colorPalette.purpleInt;}
        );

        this.sock0.on
        (
            "pointerdown",
            () =>
            {
                this.sock0.clearTint();
                this.sock0.removeInteractive();
                this.scene.launch("conversation", {file: "scene8B.json"});
                this.dialogueB = true;
            }
        );

        this.text0.on
        (
            "pointerover",
            () => 
            {
                this.text0.tint = colorPalette.goldInt;
                this.sound.play("over_sfx_1", sfxConfig);
            }
        );

        this.text0.on
        (
            "pointerout",
            () => {this.text0.tint = colorPalette.purpleInt;}
        );

        this.text0.on
        (
            "pointerdown",
            () =>
            {
                this.choice0 = true;
                this.clearChoices();
            }
        );

        this.text1.on
        (
            "pointerover",
            () => 
            {
                this.text1.tint = colorPalette.goldInt;
                this.sound.play("over_sfx_1", sfxConfig);
            }
        );

        this.text1.on
        (
            "pointerout",
            () => {this.text1.tint = colorPalette.purpleInt;}
        );

        this.text1.on
        (
            "pointerdown",
            () => 
            {
                this.choice1 = true;
                this.clearChoices();
            }
        );

        // start with dialogueA
        this.time.delayedCall
        (
            800,
            () =>
            {
                this.scene.launch("conversation", {file: "scene8A.json"});
                this.dialogueA = true;
            }
        );
    }
    //-end create()-------------------------------------------------------------

    update()
    {
        if(this.dialogueA && dialogueComplete)
        {
            console.log("powering socks");
            console.log("refreshing dialogue");
            this.dialogueA = false;
            dialogueComplete = false;
            this.sock0.setInteractive();
            this.sock0.tint = colorPalette.purpleInt;
        }

        if(this.dialogueB && dialogueComplete)
        {
            this.dialogueB = false;
            dialogueComplete = false;
            this.endOnB();
        }

        if(this.choice0)
        {
            this.choice0 = false;
            console.log("end with option 0");
            this.scene.start("letHerGo");
        }
        else if(this.choice1)
        {
            this.choice1 = false;
            console.log("end with option 1");
            this.scene.start("haveHerStay");
        }
    }

    endOnB()
    {
        this.time.delayedCall
        (
            1000,
            () =>
            {
                this.fog.alpha = 1;
                this.fog.tint = 0x000000;
                this.text0.alpha = 1;
                this.text1.alpha = 1;
                this.text2.alpha = 1;
                this.text0.setInteractive();
                this.text1.setInteractive();
            }
        )
    }

    clearChoices()
    {
        this.text0.clearTint();
        this.text1.clearTint();
        this.text0.removeInteractive();
        this.text1.removeInteractive();
    }
}

