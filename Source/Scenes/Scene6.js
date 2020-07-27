// Scene6.js
//
// Ismael Cortez
// 7-10-2020
// Group 5 Game
//
// This file contains the code for Scene 6: The Betrayal
// This scene uses Convo.js
//

class Scene6 extends Phaser.Scene
{
    constructor()
    {
        super("betrayal");

        // dialogue variables
        this.dialogueA = false;
    }

    preload()
    {
        // load the sound
        this.load.audio("end_song", "Assets/Sounds/Music/endtimes.wav");
        this.load.audio("tires_sfx", "Assets/Sounds/SFX/driveaway.wav");

    }

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
        this.sound.add("end_song");
        this.sound.add("tires_sfx");
        this.sound.play("end_song", musicConfig);
        this.sound.play("crowd_sfx", musicConfig);

        // launch the dialogue scene
        this.time.delayedCall
        (
            800,
            () =>
            {
                this.scene.launch("conversation", {file: "scene6A.json"});
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
            () => 
            {
                this.sound.stopByKey("crowd_sfx");
                this.scene.start("theClue");
            }
        );
    }
}

