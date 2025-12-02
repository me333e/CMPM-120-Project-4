import {BasicShooter} from "../gameobjects/basicShooter.js";

export class ButtonPlacement extends Phaser.GameObjects.Sprite {
    constructor({
        scene,
        x = 0,
        y = 0,
        basicB,
        basicBD,
        basicA,
        cur
    }) 
    
    {
        super(scene, x, y, 'buildbutton');
        this.setOrigin(0, 1);
        scene.add.existing(this);

        this.buttons = scene.add.group("buttons");

        this.buildButton = scene.add.image(x, y, 'buildButton').setOrigin(0);
        this.buildButton.setInteractive();
        this.buildButton.on('pointerdown', () => { 
            this.buildTower();
        });
        this.buildButtonClicked = false;

        this.basicButton = scene.add.image(x - 36, y - 7, basicB).setOrigin(0);
        this.basicButton.setInteractive();
        this.basicButton.setVisible(false);
        this.basicButton.enable = false;
        this.basicButton.on('pointerdown', () => { 
            this.buildBasic();
        });

        this.basicButtonDisabled = scene.add.image(x - 36, y - 7, basicBD).setOrigin(0);
        this.basicButtonDisabled.setVisible(false);

        this.buttons.add(this.buildButton);
        this.buttons.add(this.basicButton);
        this.buttons.add(this.basicButtonDisabled);
    }

    buildTower() {
        if (!this.buildButtonClicked) {
            this.buildButtonClicked = true;         //add conditions to see if player has enough currency to build tower
            if (basicA == true) {                   //the basicAfford is not updated if the build button is left opened, should fix this
                this.basicButtonDisabled.setVisible(false);
                this.basicButton.setVisible(true);
                this.basicButton.enable = true;
            }
            else {
                this.basicButtonDisabled.setVisible(true);
                this.basicButton.setVisible(false);
                this.basicButton.enable = false;
            }
        }
        else {
            this.buildButtonClicked = false;
            this.basicButtonDisabled.setVisible(false);
            this.basicButton.setVisible(false);
            this.basicButton.enable = false;
        }
    }

    buildBasic() {
        this.buildButtonClicked = false;
        this.buttons.setVisible(false);
        this.buttons.enable = false;
        cur -= 5;

        const basic = new BasicShooter({scene: this, x, y,});
        basic.setDepth(2);
        basic.setInteractive();
        basic.on('pointerdown', () => { 
            this.upgrades();
        });
    }

    upgrades() {
        //add the upgrade option and delete option which will give the build button options back and refund some currency
    }

}