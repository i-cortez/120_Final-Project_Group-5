// Scene4.js
//
// Ismael Cortez
// 7-10-2020
// Group 5 Game
//
// This file contains the code for Scene 4: The Mothfia
// This scene uses Convo.js
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
        this.load.audio("piano_song_1", "Assets/Sounds/Music/emptybar.wav");
        this.load.audio("crowd_sfx", "Assets/Sounds/SFX/crowdnoise.wav");

        // set the loader path
        this.load.path = "./Assets/Images/";

        // add the images
        this.load.image("background_5","Backgrounds/background_5.png");
        this.load.image("mothfather_0", "Characters/mothfather_0.png");
    }

    //--------------------------------------------------------------------------
    // CREATE
    //--------------------------------------------------------------------------
    create()
    {
        // IMAGES
        //----------------------------------------------------------------------
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
        ).setOrigin(0);

        // SOUNDS
        //----------------------------------------------------------------------
        // add scene music
        this.sound.add("piano_song_1");
        this.sound.play("piano_song_1", musicConfig);
        this.sound.play("crowd_sfx", musicConfig);

        // launch the dialogue scene
        this.time.delayedCall
        (
            800,
            () =>
            {
                this.scene.launch("conversation", {file: "scene4A.json"});
                this.dialogueA = true;
            }
        );

        // INTERACTIVE IMAGES
        //----------------------------------------------------------------------
        // the mothfather
        this.mothfather.on
        (
            "pointerover",
            () => 
            {
                this.mothfather.tint = colorPalette.goldInt;
                this.sound.play("over_sfx_1", sfxConfig);
            }
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
    //-end create()-------------------------------------------------------------

    update()
    {
        if(this.dialogueA && dialogueComplete)
        {
            this.dialogueA = false;
            this.mothfather.setInteractive();
            this.mothfather.tint = colorPalette.purpleInt;
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

