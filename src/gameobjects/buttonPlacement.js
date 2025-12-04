import {BasicShooter} from "../gameobjects/basicShooter.js";
import { TowerButtonPlacement } from "../gameobjects/towerButtonPlacement.js";

export class ButtonPlacement extends Phaser.GameObjects.Sprite {
    constructor({
        scene,
        x = 0,
        y = 0,
        basicB,
        basicBD
    }) 
    
    {
        super(scene, x, y, 'buildButton');
        this.setOrigin(0, 1);
        scene.add.existing(this);
        this.setInteractive();
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.basicActive = false;
        this.buildButtonClicked = false;

        this.buttons = scene.add.group("buttons");

        /*
        this.buildButton = scene.add.image(x, y, 'buildButton').setOrigin(0);
        this.buildButton.setInteractive();
        this.buildButton.on('pointerdown', () => { 
            this.buildTower();
        });
        */
        this.on('pointerdown', () => { 
            this.buildButton();
        });

        /*
        this.basicButton = scene.add.image(x - 36, y - 17, basicB).setOrigin(0);
        this.debuffButton = scene.add.image(x - 5, y - 48, basicB).setOrigin(0);
        this.rangeButton = scene.add.image(x + 27, y - 17, basicB).setOrigin(0);
        this.movingButton = scene.add.image(x - 5, y + 12, basicB).setOrigin(0);
        */

        /*
        .forEach((placement) => {
            const {x, y} = placement;
            const button = new ButtonPlacement({
                scene: this, 
                x: x + 400, 
                y: y + 47, 
                basicB: 'basicButton', 
                basicBD: 'basicButtonDisabled'
            });
        });
        */

        this.basicButton = scene.add.image(x - 36, y - 17, basicB).setOrigin(0);
        this.basicButton.setInteractive();
        this.basicButton.setVisible(false);
        this.basicButton.enable = false;
        this.basicButton.on('pointerdown', () => { 
            this.buildBasic();
        });

        this.basicButtonDisabled = scene.add.image(x - 36, y - 17, basicBD).setOrigin(0);
        this.basicButtonDisabled.setVisible(false);

        //this.buttons.add(this.buildButton);
        this.buttons.add(this);
        this.buttons.add(this.basicButton);
        this.buttons.add(this.basicButtonDisabled);
    }

    buildButton() {
        if (!this.buildButtonClicked) {
            this.buildButtonClicked = true;         //add conditions to see if player has enough currency to build tower
            if (this.scene.basicAfford == true) {
                this.basicActive = true;
                this.basicButtonDisabled.setVisible(false);
                this.basicButton.setVisible(true);
                this.basicButton.enable = true;
            }
            else {
                this.basicActive = false;
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
        this.scene.currency -= 5;

        const basic = new BasicShooter({scene: this.scene, x: this.x - 5, y: this.y + 7,});
        basic.setDepth(2);
        basic.setInteractive();
        basic.on('pointerdown', () => { 
            this.upgrades();
        });
    }

    upgrades() {
        //add the upgrade option and delete option which will give the build button options back and refund some currency
    }

    preUpdate() {
        if (this.buildButtonClicked && this.basicActive == false && this.scene.basicAfford == true) {
            this.basicActive = true;
            this.basicButtonDisabled.setVisible(false);
            this.basicButton.setVisible(true);
            this.basicButton.enable = true;
        }

        if (this.buildButtonClicked && this.basicActive == true && this.scene.basicAfford == false) {
            this.basicActive = false;
            this.basicButtonDisabled.setVisible(true);
            this.basicButton.setVisible(false);
            this.basicButton.enable = false;
        }
    }

}