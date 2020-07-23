// Scene5.js
//
// Ismael Cortez
// 7-10-2020
// Group 5 Game
//
// This file contains the code for Scene 5: Officer Beary
//

class Scene5 extends Phaser.Scene
{
    constructor()
    {
        super("theDiner");

        // the dialogue variables
        this.dialogueA = false;
        this.dialogueB = false;

        // the scene logic variables
        this.coffeeVisit = false;
    }

    preload()
    {
        // set the loader path
        this.load.path = "./Assets/Images/";

        // load the background image
        this.load.image("background_6","Backgrounds/background_6.png");

        // load cutout images
        this.load.image("beary", "Characters/beary_1.png");
        this.load.image("coffees", "Cutouts/mug_3.png");
    }

    create()
    {
        // add background image
        this.background = this.add.image
        (
            0, // horizontal position
            0, // vertical position
            "background_6" // texture to render with
        ).setOrigin(0, 0);

        // add the cutout images
        this.beary = this.add.image
        (
            192,
            81,
            "beary"
        ).setOrigin(0);

        this.coffee = this.add.image
        (
            100,
            400,
            "coffees"
        ).setOrigin(0);

        this.sound.play("pianoTune", musicConfig);

        // INTERACTIVE IMAGE
        // Beary
        //----------------------------------------------------------------------
        this.beary.on
        (
            "pointerover",
            () => {this.beary.tint = colorPalette.goldInt;}
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
        //-END INTERACIVE-------------------------------------------------------

        // INTERACTIVE IMAGE
        // Coffee mugs
        //----------------------------------------------------------------------
        this.coffee.on
        (
            "pointerover",
            () => {this.coffee.tint = colorPalette.goldInt;}
        );

        this.coffee.on
        (
            "pointerout",
            () => {this.coffee.tint = colorPalette.purpleInt;}
        );

        this.coffee.on
        (
            "pointerdown",
            () => 
            {
                this.coffee.destroy();
                this.beary.setInteractive();
                this.beary.tint = colorPalette.purpleInt;
            }
        );
        //-END INTERACIVE-------------------------------------------------------

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
            console.log("powering coffee mugs");
            this.dialogueA = false;
            this.coffee.setInteractive();
            this.coffee.tint = colorPalette.purpleInt;
            this.refreshDialogue();
        }

        if(this.dialogueB && dialogueComplete)
        {
            console.log("ending scene");
            this.dialogueB = false;
            this.closeScene();
        }
    }

    refreshDialogue()
    {
        dialogueComplete = false;
    }

    closeScene()
    {
        dialogueComplete = false;
        this.sound.stopByKey("pianoTune");
        this.scene.stop();
        this.scene.wake("roughWorld");
        this.sound.play("fog_city", musicConfig);
    }
}

