// Scene3.js
//
// Ismael Cortez
// 7-10-2020
// Group 5 Game
//
// This file contains the code for Scene 3: The Lamplord
// This scene uses dialogue system from Convo.js
//

class Scene3 extends Phaser.Scene
{

    constructor()
    {
        super("lamplord"); // argument is the identifier for this scene

        this.finalDialogue = false;
    }

    preload()
    {
        // set the loader path for images
        this.load.path = "./Assets/Images/Backgrounds/";

        // preload the background images
        this.load.image("background_4", "background_4.png");
    }

    create()
    {
        // add background image
        this.background = this.add.image
        (
            0, // horizontal position
            0, // vertical position
            "background_4" // texture to render with
        ).setOrigin(0, 0);

        this.sound.play("menuTune", musicConfig);

        this.time.delayedCall
        (
            800,
            () =>
            {
                this.scene.launch("conversation", {file: "scene3A.json"});
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
        dialogueComplete = false;
        this.sound.stopByKey("menuTune");
        this.scene.stop();
        this.scene.wake("roughWorld");
        this.sound.play("fog_city", musicConfig);
        
    }
}

