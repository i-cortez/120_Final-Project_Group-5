// Scene0.js
//
// Ismael Cortez
// 7-10-2020
// Group 5 Game
//
// This file contains the code for Scene 0: Rough and Tumble World Monologue
// This scene uses Convo.js
//

class Scene0 extends Phaser.Scene
{

    constructor()
    {
        // argument is the identifier for this scene
        super("firstWords"); 

        // scene dialogue variables
        this.dialogueA = false;
    }

    preload()
    {
        // set the loader path for images
        this.load.path = "./Assets/Images/Backgrounds/";

        // load images
        this.load.image("background_1", "background_1.png");
        this.load.image("fog", "fog.png");
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
            "background_1" // texture to render with
        ).setOrigin(0);

        // add the fog
        this.fog = this.add.tileSprite
        (
            0, // x-pos
            0, // y-pos
            config.width, // width
            config.height, // height
            "fog", // texture
            // frame
        ).setOrigin(0, 0).setAlpha(1);

        this.time.delayedCall
        (
            1000,
            () =>
            {
                this.scene.launch("conversation", {file: "scene0A.json"});
                this.dialogueA = true;
            }
        );
    }

    update()
    {
        this.fog.tilePositionX -= 1;
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
            () => {this.scene.start("missingSocks");}
        );
    }
}

