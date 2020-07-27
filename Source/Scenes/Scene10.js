// Scene10.js
//
// Ismael Cortez
// 7-10-2020
// Group 5 Game
//
// This file contains the code for Scene 10: You Told Her To Stay
// This scene uses Convo.js
//

class Scene10 extends Phaser.Scene
{

    constructor()
    {
        // argument is the identifier for this scene
        super("haveHerStay"); 

        // scene dialogue variables
        this.dialogueA = false;
    }

    preload()
    {
        // set the loader path for images
        this.load.path = "./Assets/Images/Backgrounds/";

        // load images
        this.load.image("background_10", "background_9.png");
    }

    create()
    {
        // IMAGES
        //----------------------------------------------------------------------
        // background imgae
        this.background = this.add.image
        (
            0, // horizontal position
            0, // vertical position
            "background_10" // texture to render with
        ).setOrigin(0);

        // SOUNDS
        //----------------------------------------------------------------------
        this.sound.play("menu_song", musicConfig);

        this.time.delayedCall
        (
            800,
            () =>
            {
                this.scene.launch("conversation", {file: "scene10A.json"});
                this.dialogueA = true;
            }
        );
    }

    update()
    {
        if(this.dialogueA && dialogueComplete)
        {
            this.dialogueA = false;
            this.endOnA();
        }
    }

    endOnA()
    {
        dialogueComplete = false;
        this.time.delayedCall
        (
            400,
            () => {this.scene.start("theEnd");}
        );
    }
}

