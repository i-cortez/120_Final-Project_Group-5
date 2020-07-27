// Scene5.js
//
// Ismael Cortez
// 7-10-2020
// Group 5 Game
//
// This file contains the code for Scene 5: Officer Beary
// This scene uses Convo.js
//

class Scene5 extends Phaser.Scene
{
    constructor()
    {
        super("theDiner");

        // the dialogue variables
        this.dialogueA = false;
        this.dialogueB = false;
    }

    preload()
    {
        // set the loader path
        this.load.path = "./Assets/Images/";

        // load images
        this.load.image("background_6","Backgrounds/background_6.png");
        this.load.image("beary_1", "Characters/beary_1.png");
        this.load.image("coffees", "Cutouts/mug_3.png");
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
            "background_6" // texture to render with
        ).setOrigin(0);

        // bear
        this.beary = this.add.image
        (
            192,
            81,
            "beary_1"
        ).setOrigin(0);

        // coffees
        this.coffees = this.add.image
        (
            100,
            400,
            "coffees"
        ).setOrigin(0);

        // SOUNDS
        //----------------------------------------------------------------------
        // play scene music
        this.sound.play("crowd_sfx", musicConfig);

        // INTERACTIVE IMAGEs
        //----------------------------------------------------------------------
        // Beary
        this.beary.on
        (
            "pointerover",
            () => 
            {
                this.beary.tint = colorPalette.goldInt;
                this.sound.play("over_sfx_1", sfxConfig);
            }
        );

        this.beary.on
        (
            "pointerout",
            () => {this.beary.tint = colorPalette.purpleInt;}
        );

        this.beary.on
        (
            "pointerdown",
            () => 
            {
                this.beary.clearTint();
                this.beary.removeInteractive();
                this.scene.launch("conversation", {file: "scene5B.json"});
                this.dialogueB = true;
            }
        );

        // coffees
        this.coffees.on
        (
            "pointerover",
            () => 
            {
                this.coffees.tint = colorPalette.goldInt;
                this.sound.play("over_sfx_1", sfxConfig);
            }
        );

        this.coffees.on
        (
            "pointerout",
            () => {this.coffees.tint = colorPalette.purpleInt;}
        );

        this.coffees.on
        (
            "pointerdown",
            () => 
            {
                this.coffees.destroy();
                this.beary.setInteractive();
                this.beary.tint = colorPalette.purpleInt;
            }
        );

        // jump into dialogue right away
        this.time.delayedCall
        (
            800,
            () =>
            {
                this.scene.launch("conversation", {file: "scene5A.json"});
                this.dialogueA = true;
            }
        );
    }

    update()
    {
        if(this.dialogueA && dialogueComplete)
        {
            this.dialogueA = false;
            this.coffees.setInteractive();
            this.coffees.tint = colorPalette.purpleInt;
            this.refreshDialogue();
        }

        if(this.dialogueB && dialogueComplete)
        {
            this.dialogueB = false;
            this.endOnB();
        }
    }

    refreshDialogue()
    {
        dialogueComplete = false;
    }

    endOnB()
    {
        dialogueComplete = false;
        this.sound.stopByKey("crowd_sfx");
        this.scene.stop();
        this.scene.wake("roughWorld");
    }
}

