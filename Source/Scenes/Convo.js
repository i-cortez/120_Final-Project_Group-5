// Convo.js
//
// Ismael Cortez
// 7-20-2020
// This file contains the code for dialogue scenes
//
// Adapted from Nathan Altice:
//  https://github.com/nathanaltice/Dialogging/blob/master/index.html
//
class Convo extends Phaser.Scene
{
    constructor()
    {
        super("conversation"); // argument is the identifier for this scene

        // dialogue constants
        this.FONT = "gem_font"; // font key

        this.TEXT_X = 640; // text w/in dialogue box x-pos
        this.TEXT_Y = 360; // text w/in dialogue box y-pos
        this.TEXT_SIZE = 24; // text font size (in pixels)
        this.TEXT_MAX_WIDTH = 600; // max width of text within box

        this.NEXT_TEXT = "[LEFT CLICK]"; // text to display for next prompt
        this.NEXT_X = 1200; // next text prompt x-pos
        this.NEXT_Y = 640; // next text prompt y-pos

        this.LETTER_TIMER = 10; // num of ms each leter takes to write

        // dialogue variables
        this.dialogueConvo = 0; // current conversation
        this.dialogueLine = 0; // curent line of conversation
        this.dialogueSpeaker = null; // current speaker
        this.dialogueLastSpeaker = null; // former speaker
        this.dialogueTyping = false; // flag to lock player input while writing
        this.dialogueText = null; // the text to display
        this.nextText = null; // player prompt text to continue typing
        this.eof = false;
    }

    init(data)
    {
        this.file = data.file;
        console.log(this.file);
    }

    preload()
    {
        // load the JSON data (dialogue)
        this.load.path = "./Data/";
        this.load.json("dialogue", this.file);

        // load the XML based bitmap font
        this.load.path = "./Assets/Fonts/";
        this.load.bitmapFont("gem_font", "gem.png", "gem.xml");

        // set the loader path for images
        this.load.path = "./Assets/Images/Backgrounds/";

        // preload the background images
        this.load.image("still_fog", "still_fog.png");
    }

    create()
    {
        // parse dialog from JSON file
        this.dialogue = this.cache.json.get("dialogue");

        // add the fog
        this.fog = this.add.image
        (
            0,
            0,
            "still_fog",
        ).setOrigin(0, 0);
        this.fog.tint = 0x000000;

        // initialize dialog text object (with no text)
        this.dialogueText = this.add.bitmapText
        (
            this.TEXT_X,
            this.TEXT_Y,
            this.FONT,
            "",
            this.TEXT_SIZE
        );

        // initialize the next text button
        this.nextText = this.add.bitmapText
        (
            this.NEXT_X,
            this.NEXT_Y,
            this.FONT,
            "",
            this.TEXT_SIZE
        );

        this.typeText();
    }

    update()
    {
        // check for click to continue remaining text
        if
        (this.input.activePointer.leftButtonDown() &&
        !this.dialogueTyping &&
        !this.eof
        )
        {
            // trigger dialogue
            this.typeText();
        }

        // at end of dialogue end the scene
        if(this.eof)
        {
            this.resetScene();
            dialogueComplete = true;
            this.scene.stop();
        }
    }

    typeText()
    {
        // lock input while typing
        this.dialogueTyping = true;

        // clear current text
        this.dialogueText.text = "";
        this.nextText.text = "";

        if(this.dialogueLine > this.dialogue[this.dialogueConvo].length - 1)
        {
            this.dialogueLine = 0;

            // increment conversations here
            // can also create logic to exit the dialogue here
            this.dialogueConvo++;
        }

        if(this.dialogueConvo >= this.dialogue.length)
        {
            // simply exit the last speaker and remove the dialog box
            // can also build other logic to change game states here
            console.log("End of conversations");
            this.eof = true;
            return;
        }

        // build dialog (concatenate speaker + line of text)
        this.dialogueLines =
        this.dialogue[this.dialogueConvo][this.dialogueLine]["speaker"]
        .toUpperCase() +
        ": " + this.dialogue[this.dialogueConvo][this.dialogueLine]["dialogue"];

        // create a timer to iterate through each letter in the dialog
        let currentChar = 0;
        this.textTimer = this.time.addEvent
        (
            {
                delay: this.LETTER_TIMER,
                repeat: this.dialogueLines.length - 1,
                callback: () =>
                {
                    // concatenate next letter from dialogLines
                    this.dialogueText.text += this.dialogueLines[currentChar];
                    // advance character position
                    currentChar++;

                    // check if timer has exhausetd its repeats
                    // necessary since Phaser 3 no longer seems to have an
                    // onComplete event
                    if(this.textTimer.getRepeatCount() == 0)
                    {
                        // show prompt for more text
                        this.nextText = this.add.bitmapText
                        (
                            this.NEXT_X,
                            this.NEXT_Y,
                            this.FONT,
                            this.NEXT_TEXT,
                            this.TEXT_SIZE
                        ).setOrigin(1);
                        
                        // unlock input
                        this.dialogueTyping = false;
                        // destroy timer
                        this.textTimer.destroy();
                    }
                },
                callbackScope: this // keep Scene context
            }
        );
        // set bounds on dialogue
        this.dialogueText.maxWidth = this.TEXT_MAX_WIDTH;

        // increment dialog line
        this.dialogueLine++;
        this.dialogueLastSpeaker = this.dialogueSpeaker;
    }
    
    resetScene()
    {
        // reset the dialogue variables
        this.dialogueConvo = 0; // current conversation
        this.dialogueLine = 0; // curent line of conversation
        this.dialogueSpeaker = null; // current speaker
        this.dialogueLastSpeaker = null; // former speaker
        this.dialogueTyping = false; // flag to lock player input while writing
        this.dialogueText = null; // the text to display
        this.nextText = null; // player prompt text to continue typing
        this.eof = false;
        this.cache.json.remove("dialogue"); // remove cache immediately
    }
}

