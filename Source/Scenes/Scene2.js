// Scene2.js
//
// Ismael Cortez
// 7-10-2020
// Group 5 Game
//
// This file contains the code for Scene 2: The Room
//

class Scene2 extends Phaser.Scene
{
    constructor()
    {
        super("roughWorld"); // argument is the identifier for this scene
        
        // the dialogue variables
        this.dialogueA = false;
    }

    preload()
    {
        // set the loader path
        this.load.path = "./Assets/";

        // load the background images
        this.load.image
        (
            "background_3","Images/Backgrounds/background_3.png"
        );

        this.load.image("fog", "Images/Backgrounds/fog.png");

        // load the nightstand image
        this.load.image
        (
            "nightstand",
            "Images/Cutouts/nightstand.png",
        );

        this.load.image("mothdrawer", "Images/Cutouts/mothdrawer.png");
        this.load.image("car_0", "Images/Cutouts/car_0.png");
        this.load.image("beary_0", "Images/Characters/beary_0.png");

        // load the menu scene music
        this.load.audio("fog_city", "Sounds/fog_city.wav");
    }

    create()
    {
        // add background image
        this.background = this.add.image
        (
            0, // horizontal position
            0, // vertical position
            "background_3" // texture to render with
        ).setOrigin(0, 0);

        // add the nightstand sprite
        this.nightstand = this.add.image
        (
            320, // horizontal position
            160, // vertical position
            "nightstand" // texture to render with 
        ).setOrigin(0, 0).setInteractive();
        this.nightstand.tint = colorPalette.purpleInt;

        this.beary = this.add.image
        (
            167,
            549,
            "beary_0"
        ).setOrigin(0).setInteractive();
        this.beary.tint = colorPalette.purpleInt;

        this.car = this.add.image
        (
            1150,
            615,
            "car_0"
        ).setOrigin(0).setInteractive();
        this.car.tint = colorPalette.purpleInt;

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
            0,
            0,
            config.width,
            config.height,
            "fog",
        ).setOrigin(0, 0).setAlpha(0.6);

        // check for pointer over object
        //-nightstand-----------------------------------------------------------
        this.nightstand.on
        (
            "pointerover",
            () => {this.nightstand.tint = colorPalette.goldInt;}
        );

        // check for pointer leaving object
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
                this.scene.launch("conversation", {file: "scene2A.json"});
                this.dialogueA = true;
            }
        );
        //-end nightstand-------------------------------------------------------

        // check for pointer over object
        //-mothdrawer-----------------------------------------------------------
        this.mothdrawer.on
        (
            "pointerover",
            () => {this.mothdrawer.tint = colorPalette.goldInt;}
        );

        // check for pointer leaving object
        this.mothdrawer.on
        (
            "pointerout",
            () => {this.mothdrawer.tint = colorPalette.purpleInt;}
        );

        this.mothdrawer.on
        (
            "pointerdown",
            () => {console.log("mothdrawer");}
        );
        //-end mothdrawer-------------------------------------------------------

        // check for pointer over object
        //-car------------------------------------------------------------------
        this.car.on
        (
            "pointerover",
            () => {this.car.tint = colorPalette.goldInt;}
        );

        // check for pointer leaving object
        this.car.on
        (
            "pointerout",
            () => {this.car.tint = colorPalette.purpleInt;}
        );

        this.car.on
        (
            "pointerdown",
            () => {console.log("car");}
        );
        //-end car -------------------------------------------------------------

        // check for pointer
        //-beary----------------------------------------------------------------
        this.beary.on
        (
            "pointerover",
            () => {this.beary.tint = colorPalette.goldInt;}
        );

        // check for pointer leaving object
        this.beary.on
        (
            "pointerout",
            () => {this.beary.tint = colorPalette.purpleInt;}
        );

        this.beary.on
        (
            "pointerdown",
            () => {console.log("beary");}
        );
        //-end beary------------------------------------------------------------

        this.cityMusic = this.sound.add("fog_city");
        this.cityMusic.play(musicConfig);
    }

    update()
    {
        // move the fog across the screen
        this.fog.tilePositionX -= 1;

        if(this.dialogueA && dialogueComplete)
        {
            console.log("pause scene");
            this.dialogueA = false;
            this.suspendScene();
        }
    }

    suspendScene()
    {
        dialogueComplete = false;
        this.sound.stopByKey("fog_city");
        this.scene.sleep();
        this.scene.launch("lamplord");
    }
}

