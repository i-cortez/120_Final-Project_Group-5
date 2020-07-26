// Scene2.js
//
// Ismael Cortez
// 7-10-2020
// Group 5 Game
//
// This file contains the code for Scene 2: The Room
// This scene uses Convo.js
//

class Scene2 extends Phaser.Scene
{
    constructor()
    {
        super("roughWorld"); // argument is the identifier for this scene
        
        // the dialogue variables
        this.dialogueA = false;
        this.dialogueB = false;
        this.dialogueC = false;
        this.dialogueD = false;
        this.dialogueE = false;
        this.dialogueF = false;
        this.dialogueG = false;
        this.dialogueH = true;

        // the scene logic variables
        this.lampVisit = false;
        this.mothVisit0 = false;
        this.mothVisit1 = false;
        this.bearVisit = false;
        this.carVisit = false;
    }

    preload()
    {
        // set the loader path
        this.load.path = "./Assets/";

        // load images
        this.load.image
        (
            "background_3","Images/Backgrounds/background_3.png"
        );

        this.load.image("fog", "Images/Backgrounds/fog.png");

        this.load.image
        (
            "nightstand",
            "Images/Cutouts/nightstand.png",
        );

        this.load.image("mothdrawer", "Images/Cutouts/mothdrawer.png");
        this.load.image("car_0", "Images/Cutouts/car_0.png");
        this.load.image("beary_0", "Images/Characters/beary_0.png");

        // load sounds
        this.load.audio("fog_city", "Sounds/Music/fog_city.wav");
    }

    //--------------------------------------------------------------------------
    // CREATE
    //--------------------------------------------------------------------------
    create()
    {
        // IMAGES
        //----------------------------------------------------------------------
        // background image
        this.background = this.add.image
        (
            0, // horizontal position
            0, // vertical position
            "background_3" // texture to render with
        ).setOrigin(0, 0);

        // add the nightstand sprite
        this.nightstand = this.add.image
        (
            320,
            160,
            "nightstand"
        ).setOrigin(0, 0).setInteractive();

        this.nightstand.tint = colorPalette.purpleInt;

        // add the bear
        this.beary = this.add.image
        (
            167,
            549,
            "beary_0"
        ).setOrigin(0).setInteractive();

        this.beary.tint = colorPalette.purpleInt;

        // add the car
        this.car = this.add.image
        (
            1150,
            615,
            "car_0"
        ).setOrigin(0).setInteractive();

        this.car.tint = colorPalette.purpleInt;

        // add the drawer
        this.mothdrawer = this.add.image
        (
            479,
            192,
            "mothdrawer"
        ).setOrigin(0).setInteractive();

        this.mothdrawer.tint = colorPalette.purpleInt;

        // add the fog
        this.fog = this.add.tileSprite
        (
            0, // x-pos
            0, // y-pos
            config.width, // width
            config.height, // height
            "fog", // texture
            // frame
        ).setOrigin(0, 0).setAlpha(0.6);

        // SOUNDS
        //----------------------------------------------------------------------
        // add scene music
        this.sound.add("fog_city");
        this.sound.play("fog_city", musicConfig);

        // INTERACTIVE IMAGES
        //----------------------------------------------------------------------
        // nightstand
        this.nightstand.on
        (
            "pointerover",
            () => 
            {
                this.nightstand.tint = colorPalette.goldInt;
                this.sound.play(getRandSFX(), sfxConfig);
            }
        );

        this.nightstand.on
        (
            "pointerout",
            () => {this.nightstand.tint = colorPalette.purpleInt;}
        );

        this.nightstand.on
        (
            "pointerdown",
            () =>
            {
                this.nightstand.clearTint();
                this.nightstand.removeInteractive();
                this.mothdrawer.disableInteractive();
                this.beary.disableInteractive();
                this.car.disableInteractive();
                this.scene.launch("conversation", {file: "scene2A.json"});
                this.dialogueA = true;
            }
        );

        // drawer
        this.mothdrawer.on
        (
            "pointerover",
            () => 
            {
                this.mothdrawer.tint = colorPalette.goldInt;
                this.sound.play(getRandSFX(), sfxConfig);
            }
        );

        this.mothdrawer.on
        (
            "pointerout",
            () => {this.mothdrawer.tint = colorPalette.purpleInt;}
        );

        this.mothdrawer.on
        (
            "pointerdown",
            () =>
            {
                if(this.lampVisit && !this.mothVisit0)
                {
                    this.mothdrawer.disableInteractive();
                    this.beary.disableInteractive();
                    this.car.disableInteractive();
                    this.scene.launch("conversation", {file: "scene2E.json"});
                    this.dialogueE = true;
                }
                else if(this.bearVisit && ! this.mothVisit1)
                {
                    this.car.disableInteractive();
                    this.mothdrawer.clearTint();
                    this.mothdrawer.removeInteractive();
                    this.scene.launch("conversation", {file: "scene2G.json"});
                    this.dialogueG = true;
                }
                else
                {
                    this.unSetInteractive();
                    this.scene.launch("conversation", {file: "scene2B.json"});
                    this.dialogueB = true;
                }
            }
        );

        // bear
        this.beary.on
        (
            "pointerover",
            () => 
            {
                this.beary.tint = colorPalette.goldInt;
                this.sound.play(getRandSFX(), sfxConfig);
            }
        );

        this.beary.on
        (
            "pointerout",
            () => {this.beary.tint = colorPalette.purpleInt;}
        );

        this.beary.on
        (
            "pointerdown",
            () =>
            {
                if(this.mothVisit0 && !this.bearVisit)
                {
                    this.beary.clearTint();
                    this.beary.removeInteractive();
                    this.mothdrawer.disableInteractive();
                    this.car.disableInteractive();
                    this.scene.launch("conversation", {file: "scene2F.json"});
                    this.dialogueF = true;
                }
                else
                {
                    this.unSetInteractive();
                    this.scene.launch("conversation", {file: "scene2C.json"});
                    this.dialogueC = true;
                }
            }
        );

        // car
        this.car.on
        (
            "pointerover",
            () => 
            {
                this.car.tint = colorPalette.goldInt;
                this.sound.play(getRandSFX(), sfxConfig);
            }
        );

        this.car.on
        (
            "pointerout",
            () => {this.car.tint = colorPalette.purpleInt;}
        );

        this.car.on
        (
            "pointerdown",
            () =>
            {
                if(this.mothVisit1 && !this.carVisit)
                {
                    this.car.clearTint();
                    this.car.removeInteractive();
                    this.scene.launch("conversation", {file: "scene2H.json"});
                    this.dialogueH = true;
                }
                else
                {
                    this.unSetInteractive();
                    this.scene.launch("conversation", {file: "scene2D.json"});
                    this.dialogueD = true;
                }
            }
        );
    }
    //-end create()-------------------------------------------------------------

    //--------------------------------------------------------------------------
    // UPDATE
    //--------------------------------------------------------------------------
    update()
    {
        // move the fog across the screen
        this.fog.tilePositionX -= 1;

        if(this.dialogueA && dialogueComplete)
        {
            console.log("pause scene");
            this.dialogueA = false;
            this.initLampScene();
        }

        if(this.dialogueB && dialogueComplete)
        {
            this.dialogueB = false;
            dialogueComplete = false;
            console.log("refresh dialogue");
            this.reSetInteractive();
        }

        if(this.dialogueC && dialogueComplete)
        {
            this.dialogueC = false;
            dialogueComplete = false;
            console.log("refresh dialogue");
            this.reSetInteractive();
        }

        if(this.dialogueD && dialogueComplete)
        {
            this.dialogueD = false;
            dialogueComplete = false;
            console.log("refresh scene dialogue");
            this.reSetInteractive();
        }

        if(this.dialogueE && dialogueComplete)
        {
            this.mothdrawer.setInteractive();
            this.beary.setInteractive();
            this.car.setInteractive();
            console.log("pause scene");
            this.dialogueE = false;
            this.initMothScene();
        }

        if(this.dialogueF && dialogueComplete)
        {
            this.mothdrawer.setInteractive();
            this.car.setInteractive();
            console.log("pause scene");
            this.dialogueF = false;
            this.initBearScene();
        }

        if(this.dialogueG && dialogueComplete)
        {
            this.car.setInteractive();
            console.log("pause scene");
            this.dialogueG = false;
            this.initBetrayalScene();
        }

        if(this.dialogueH && dialogueComplete)
        {
            console.log("ending scene");
            this.dialogueH = false;
            this.initCarScene();
        }
    }
    //-end update()-------------------------------------------------------------

    initLampScene()
    {
        dialogueComplete = false;
        this.lampVisit = true;
        this.mothdrawer.setInteractive();
        this.beary.setInteractive();
        this.car.setInteractive();
        this.scene.sleep();
        this.scene.launch("lamplord");
    }

    initMothScene()
    {
        dialogueComplete = false;
        this.mothVisit0 = true;
        this.sound.stopByKey("fog_city");
        this.scene.sleep();
        this.scene.launch("mothfia");
    }

    initBearScene()
    {
        dialogueComplete = false;
        this.bearVisit = true;
        this.scene.sleep();
        this.scene.launch("theDiner");
    }

    initBetrayalScene()
    {
        dialogueComplete = false;
        this.mothVisit1 = true;
        this.scene.sleep();
        this.scene.launch("betrayal");
    }

    initCarScene()
    {
        dialogueComplete = false;
        this.carVisit = true;
        this.scene.start("sheila");
    }

    refreshDialogue()
    {
        dialogueComplete = false;
    }

    unSetInteractive()
    {
        this.nightstand.disableInteractive();
        this.mothdrawer.disableInteractive();
        this.beary.disableInteractive();
        this.car.disableInteractive();
    }

    reSetInteractive()
    {
        if
        (
            (
                this.lampVisit &&
                this.mothVisit0 &&
                this.bearVisit &&
                !
                (
                    this.mothVisit1 &&
                    this.carVisit
                )
                
            )
        )
        {
            this.mothdrawer.setInteractive();
            this.car.setInteractive();
        }
        else if
        (
            this.lampVisit &&
            this.mothVisit0 &&
            !
            (
                this.mothVisit1 &&
                this.bearVisit &&
                this.carVisit
            )
        )
        {
            this.mothdrawer.setInteractive();
            this.beary.setInteractive();
            this.car.setInteractive();
        }
        else if
        (
            this.lampVisit &&
            !
            (
                this.mothVisit0 &&
                this.mothVisit1 &&
                this.bearVisit &&
                this.carVisit
            )
        )
        {
            this.mothdrawer.setInteractive();
            this.beary.setInteractive();
            this.car.setInteractive();
        }
        else
        {
            this.nightstand.setInteractive();
            this.mothdrawer.setInteractive();
            this.beary.setInteractive();
            this.car.setInteractive();
        }
    }
}

