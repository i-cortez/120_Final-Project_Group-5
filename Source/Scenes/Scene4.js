// Scene4.js
//
// Ismael Cortez
// 7-10-2020
// Group 5 Game
//
// This file contains the code for Scene 4: The Mothfia
// This scene uses the dialogue system from Convo.js
//

class Scene4 extends Phaser.Scene
{
    constructor()
    {
        super("mothfia");

        // dialogue variables
        this.dialogueA = false;
        this.dialogueB = false;
    }

    preload()
    {

        // load the audio
        this.load.audio("pianoTune", "Assets/Sounds/pianobar.wav");

        // set the loader path
        this.load.path = "./Assets/Images/";

        // load the background image
        this.load.image("background_5","Backgrounds/background_5.png");

        // load the mothfather
        this.load.image("mothfather_0", "Characters/mothfather_0.png");


    }

    create()
    {
        // add background image
        this.background = this.add.image
        (
            0, // horizontal position
            0, // vertical position
            "background_5" // texture to render with
        ).setOrigin(0, 0);

        this.mothfather = this.add.image
        (
            13,
            234,
            "mothfather_0"
        ).setOrigin(0).setInteractive();
        this.mothfather.tint = colorPalette.purpleInt;

        this.sceneMusic = this.sound.add("pianoTune");
        this.sceneMusic.play(musicConfig);

        this.time.delayedCall
        (
            800,
            () =>
            {
                this.scene.launch("conversation", {file: "scene4A.json"});
                this.dialogueA = true;
            }
        );

        // interactive events for mothfather
        this.mothfather.on
        (
            "pointerover",
            () => {this.mothfather.tint = colorPalette.goldInt;}
        );

        this.mothfather.on
        (
            "pointerout",
            () => {this.mothfather.tint = colorPalette.purpleInt;}
        );

        this.mothfather.on
        (
            "pointerdown",
            () => 
            {
                this.mothfather.clearTint();
                this.mothfather.removeInteractive();
                this.scene.launch("conversation", {file: "scene4B.json"});
                this.dialogueB = true;
            }
        );
    }

    update()
    {
        if(this.dialogueA && dialogueComplete)
        {
            console.log("refresh scene dialogue");
            this.dialogueA = false;
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

