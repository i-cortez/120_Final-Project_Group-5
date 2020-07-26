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
        this.ONSCREEN_X = 0;
        this.ONSCREEN_Y = 360;
        this.FONT = "gem_font"; // font key

        this.TEXT_X = 640; // text w/in dialogue box x-pos
        this.TEXT_Y = 360; // text w/in dialogue box y-pos
        this.TEXT_SIZE = 24; // text font size (in pixels)
        this.TEXT_MAX_WIDTH = 600; // max width of text within box

        this.NEXT_TEXT = "[LEFT CLICK]"; // text to display for next prompt
        this.NEXT_X = 1200; // next text prompt x-pos
        this.NEXT_Y = 640; // next text prompt y-pos

        this.LETTER_TIMER = 10; // num of ms each leter takes to write

        this.OFFSCREEN_X = -500;
        this.OFFSCREEN_Y = 1000;

        // dialogue variables
        this.dialogueConvo = 0; // current conversation
        this.dialogueLine = 0; // curent line of conversation
        this.dialogueSpeaker = null; // current speaker
        this.dialogueLastSpeaker = null; // former speaker
        this.dialogueTyping = false; // flag to lock player input while writing
        this.dialogueText = null; // the text to display
        this.nextText = null; // player prompt text to continue typing
        this.eof = false;

        // character variables
        // names after this. must match key!
        this.detective = null;
        this.lamplord = null;
        this.mothfather = null;
        this.beary = null;
        this.sheila = null;

        this.tweenDuration = 500;
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

        // preload the characters
        // remember keys must match character variable names!
        this.load.path = "./Assets/Images/Characters/";
        this.load.image("detective", "kid_0.png"); //
        this.load.image("lamplord", "lamplord_0.png");
        this.load.image("mothfather", "mothfather_1.png");
        this.load.image("beary", "beary_2.png");
        this.load.image("sheila", "sheila_1.png");
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

        // ready the character images offscreen
        this.detective = this.add.sprite
        (
            this.OFFSCREEN_X,
            this.ONSCREEN_Y,
            "detective"
        ).setOrigin(0.5);
        
        this.lamplord = this.add.sprite
        (
            this.OFFSCREEN_X,
            this.ONSCREEN_Y,
            "lamplord"
        ).setOrigin(0.5);

        this.mothfather = this.add.sprite
        (
            this.OFFSCREEN_X,
            this.ONSCREEN_Y,
            "mothfather"
        ).setOrigin(0.5);

        this.beary = this.add.sprite
        (
            this.OFFSCREEN_X,
            this.ONSCREEN_Y,
            "beary"
        ).setOrigin(0.5);

        this.sheila = this.add.sprite
        (
            this.OFFSCREEN_X,
            this.ONSCREEN_Y,
            "sheila"
        ).setOrigin(0.5);

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

        /*
            Conversation data structure:
            - each array within the main JSON array is a conversation
            - each object within a conversation is a line
            - each line can have 3 properties
                1) a speaker
                2) the dialoge text
                3) an optional flag indicating if the speaker is new
        */

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

            // tween out priour speaker's image
            if(this.dialogueLastSpeaker)
            {
                this.tweens.add
                (
                    {
                        targets: this[this.dialogueLastSpeaker],
                        x: this.OFFSCREEN_X,
                        duration: this.tweenDuration,
                        ease: "Linear"
                    }
                );
            }
            this.eof = true;
            return;
        }
        else
        {
            // if not, set current speaker
            this.dialogueSpeaker =
            this.dialogue[this.dialogueConvo][this.dialogueLine]["speaker"];

            // check if there's a new speaker (for exit/enter animations)
            if(this.dialogue[this.dialogueConvo][this.dialogueLine]["newSpeaker"])
            {
                // tween out prior speaker's image
                if(this.dialogueLastSpeaker)
                {
                    this.tweens.add
                    (
                        {
                            targets: this[this.dialogueLastSpeaker],
                            x: this.OFFSCREEN_X,
                            duration: this.tweenDuration,
                            ease: "Linear"
                        }
                    );
                }

                this.tweens.add
                (
                    {
                        targets: this[this.dialogueSpeaker],
                        x: this.ONSCREEN_X + 320,
                        duration: this.tweenDuration,
                        ease: "Linear"
                    }
                );
            }
            
            // build dialog (concatenate speaker + line of text)
            this.dialogueLines =
            this.dialogue[this.dialogueConvo][this.dialogueLine]["speaker"]
            .toUpperCase() +
            ": " + 
            this.dialogue[this.dialogueConvo][this.dialogueLine]["dialogue"];
            
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
                        this.dialogueText.text +=
                        this.dialogueLines[currentChar];
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

