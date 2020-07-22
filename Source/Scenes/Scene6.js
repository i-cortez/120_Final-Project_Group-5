// Scene5.js
//
// Ismael Cortez
// 7-10-2020
// Group 5 Game
//
// This file contains the code for Scene 5: The Betrayal
//

class Scene6 extends Phaser.Scene
{
    constructor()
    {
        super("intermission");
    }

    create()
    {
        menuConfig.color = colorPalette.greyStr;
        this.continue = this.add.text
        (
            640,
            360,
            "To be continued...",
            menuConfig
        ).setOrigin(0.5);
    }
}

