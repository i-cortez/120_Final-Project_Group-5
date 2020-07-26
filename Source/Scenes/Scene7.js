// Scene7.js
//
// Ismael Cortez
// 7-10-2020
// Group 5 Game
//
// This file contains the code for Scene 7: The Clue
// This scene uses Convo.js
//

class Scene7 extends Phaser.Scene
{
    constructor()
    {
        super("theClue");

        // dialogue variables
        this.dialogueA = false;
        this.dialogueB = false;
        this.dialogueC = false;

        // scene logic variables
        this.hint0 = false;
        this.hint1 = false;
        this.hint2 = false;
        this.firstClue = false;
    }

    preload()
    {
        // set the loader path
        this.load.path = "./Assets/Images/";

        // load images
        this.load.image("background_7", "Backgrounds/background_7.png");
        this.load.image("hint_0", "Cutouts/hint_0.png");
        this.load.image("hint_1", "Cutouts/hint_1.png");
        this.load.image("hint_2", "Cutouts/hint_2.png");
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
            "background_7" // texture to render with
        ).setOrigin(0);

        // add the paper pieces
        this.paper0 = this.add.sprite
        (
            100, // x-pos
            360, // y-pos
            "hint_0" // texture
        ).setOrigin(0.5);

        this.paper1 = this.add.sprite
        (
            400, // x-pos
            160, // y-pos
            "hint_1" // texture
        ).setOrigin(0.5);

        this.paper2 = this.add.sprite
        (
            1180, // x-pos
            420, // y-pos
            "hint_2" // texture
        ).setOrigin(0.5);

        // INTERACTIVE IMAGES
        //----------------------------------------------------------------------
        // the paper pieces
        this.paper0.on
        (
            "pointerover",
            () => 
            {
                this.paper0.tint = colorPalette.goldInt;
                this.sound.play(getRandSFX(), sfxConfig);
            }
        );

        this.paper0.on
        (
            "pointerout",
            () => {this.paper0.tint = colorPalette.purpleInt;}
        );

        this.paper0.on
        (
            "pointerdown",
            () =>
            {
                this.hint0 = true;
                this.paper0.clearTint();
                this.paper0.removeInteractive();
                this.tweens.add
                (
                    {
                        targets: this.paper0,
                        x: 490,
                        rotation: - 0.8727,
                        duration: 1000,
                        ease: "Linear"
                    }
                );
            }
        );

        this.paper1.on
        (
            "pointerover",
            () => 
            {
                this.paper1.tint = colorPalette.goldInt;
                this.sound.play(getRandSFX(), sfxConfig);
            }
        );

        this.paper1.on
        (
            "pointerout",
            () => {this.paper1.tint = colorPalette.purpleInt;}
        );

        this.paper1.on
        (
            "pointerdown",
            () =>
            {
                this.hint1 = true;
                this.paper1.clearTint();
                this.paper1.removeInteractive();
                this.tweens.add
                (
                    {
                        targets: this.paper1,
                        x: 640,
                        y: 370,
                        rotation: - 0.2443,
                        duration: 1000,
                        ease: "Linear"
                    }
                );
            }
        );

        this.paper2.on
        (
            "pointerover",
            () => 
            {
                this.paper2.tint = colorPalette.goldInt;
                this.sound.play(getRandSFX(), sfxConfig);
            }
        );

        this.paper2.on
        (
            "pointerout",
            () => {this.paper2.tint = colorPalette.purpleInt;}
        );

        this.paper2.on
        (
            "pointerdown",
            () =>
            {
                this.hint2 = true;
                this.paper2.clearTint();
                this.paper2.removeInteractive();
                this.tweens.add
                (
                    {
                        targets: this.paper2,
                        x: 800,
                        y: 352,
                        rotation: - 2.262,
                        duration: 1000,
                        ease: "Linear"
                    }
                );
            }
        );

        // beginning dialogue
        this.time.delayedCall
        (
            800,
            () =>
            {
                this.scene.launch("conversation", {file: "scene7A.json"});
                this.dialogueA = true;
            }
        );
    }

    update()
    {
        if(this.dialogueA && dialogueComplete)
        {
            console.log("powering clues");
            console.log("refreshing dialogue");
            this.dialogueA = false;
            this.paper0.setInteractive();
            this.paper1.setInteractive();
            this.paper2.setInteractive();
            this.paper0.tint = colorPalette.purpleInt;
            this.paper1.tint = colorPalette.purpleInt;
            this.paper2.tint = colorPalette.purpleInt;
            this.refreshDialogue();
        }

        if(this.dialogueB && dialogueComplete)
        {
            console.log("refreshing dialogue");
            this.reSetInteractive();
            this.dialogueB = false;
            this.refreshDialogue();
        }

        if(this.dialogueC && dialogueComplete)
        {
            console.log("ending scene");
            this.dialogueC = false;
            this.endOnC();
        }

        if(this.hint0 && this.hint1 && this.hint2)
        {
            this.hint0 = this.hint1 = this.hint2 = false;
            this.time.delayedCall
            (
                2000,
                () =>
                {
                    this.scene.launch("conversation", {file: "scene7C.json"});
                    this.dialogueC = true;
                }
            );
        }

        if(!this.firstClue && (this.hint0 || this.hint1 || this.hint2))
        {
            this.firstClue = true;
            this.unSetInteractive();
            this.time.delayedCall
            (
                1200,
                () =>
                {
                    this.scene.launch("conversation", {file: "scene7B.json"});
                    this.dialogueB = true;
                }
            );
        }
    }

    refreshDialogue()
    {
        dialogueComplete = false;
    }

    endOnC()
    {
        dialogueComplete = false;
        this.scene.stop();
        this.scene.wake("roughWorld");
    }

    unSetInteractive()
    {
        this.paper0.disableInteractive();
        this.paper1.disableInteractive();
        this.paper2.disableInteractive();
    }

    reSetInteractive()
    {
        if(this.hint0 && !(this.hint1 && this.hint2))
        {
            this.paper1.setInteractive();
            this.paper2.setInteractive();
        }
        else if(this.hint1 && ! (this.hint0 && this.hint2))
        {
            this.paper0.setInteractive();
            this.paper2.setInteractive();
        }
        else
        {
            this.paper0.setInteractive();
            this.paper1.setInteractive();
        }
    }
}

