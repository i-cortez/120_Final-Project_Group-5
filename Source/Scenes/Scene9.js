// Scene9.js
//
// Ismael Cortez
// 7-10-2020
// Group 5 Game
//
// This file contains the code for Scene 9: You Let Her Go
// This scene uses Convo.js
//

class Scene9 extends Phaser.Scene
{

    constructor()
    {
        // argument is the identifier for this scene
        super("letHerGo"); 

        // scene dialogue variables
        this.dialogueA = false;
    }

    preload()
    {
        // set the loader path for images
        this.load.path = "./Assets/Images/Backgrounds/";

        // load images
        this.load.image("background_9", "background_1.png");
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
            "background_9" // texture to render with
        ).setOrigin(0);

        // SOUNDS
        //----------------------------------------------------------------------
        this.sound.play("menu_song", musicConfig);

        this.time.delayedCall
        (
            800,
            () =>
            {
                this.scene.launch("conversation", {file: "scene9A.json"});
                this.dialogueA = true;
            }
        );
    }

    update()
    {
        if(this.dialogueA && dialogueComplete)
        {
            console.log("ending scene");
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

