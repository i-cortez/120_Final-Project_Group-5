// Scene0.js
//
// Ismael Cortez
// 7-10-2020
// Group 5 Game
//
// This file contains the code for Scene 0: Rough and Tumble World Monologue
// This scene uses plays dialogue from Convo.js
//

class Scene0 extends Phaser.Scene
{

    constructor()
    {
        super("firstWords"); // argument is the identifier for this scene

        this.finalDialogue = false;
    }

    preload()
    {
        // set the loader path for images
        this.load.path = "./Assets/Images/Backgrounds/";

        // preload the background images
        this.load.image("background_1", "background_1.png");
    }

    create()
    {
        // add background image
        this.background = this.add.image
        (
            0, // horizontal position
            0, // vertical position
            "background_1" // texture to render with
        ).setOrigin(0, 0);

        this.time.delayedCall
        (
            500,
            () =>
            {
                this.scene.launch("conversation", {file: "scene0A.json"});
                this.finalDialogue = true;
            }
        );
    }

    update()
    {
        if(this.finalDialogue && dialogueComplete)
        {
            console.log("ending scene");
            this.finalDialogue = false;
            this.closeScene();
        }
    }

    closeScene()
    {
        menuConfig.color = colorPalette.purpleStr;
        dialogueComplete = false;
        this.scene.start("missingSocks");
    }
}

