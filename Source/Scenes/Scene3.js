// Scene3.js
//
// Ismael Cortez
// 7-10-2020
// Group 5 Game
//
// This file contains the code for Scene 3: The Lamplord
// This scene uses Convo.js
//

class Scene3 extends Phaser.Scene
{

    constructor()
    {
        super("lamplord"); // argument is the identifier for this scene

        // scene dialogue variables
        this.dialogueA = false;
    }

    preload()
    {
        // set the loader path
        this.load.path = "./Assets/Images/Backgrounds/";

        // load images
        this.load.image("background_4", "background_4.png");
    }

    create()
    {
        // IMAGES
        //----------------------------------------------------------------------
        // add background image
        this.background = this.add.image
        (
            0, // horizontal position
            0, // vertical position
            "background_4" // texture to render with
        ).setOrigin(0);

        // launch the dialogue scene
        this.time.delayedCall
        (
            800,
            () =>
            {
                this.scene.launch("conversation", {file: "scene3A.json"});
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
        this.scene.stop();
        this.scene.wake("roughWorld");
    }
}

