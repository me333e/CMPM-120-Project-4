import {ButtonPlacement} from "../gameobjects/buttonPlacement.js";

export class TowerButtonPlacement extends Phaser.GameObjects.Sprite {
    constructor({
        scene,
        x = 0,
        y = 0,
        active,
        disabled,
        afford,
        cost,
        buttonPlacement
    }) 
    
    {
        super(scene, x, y, active);
        this.setOrigin(0);
        scene.add.existing(this);
        this.setInteractive();
        this.setVisible(false);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.enable = false;
        this.afford = afford;
        this.buildButtonClicked = false;

        this.buttonDisabled = scene.add.image(x, y, disabled).setOrigin(0);
        this.buttonDisabled.setVisible(false);
        this.cost = scene.add.text(x + 18, y + 15, cost, {
            fontSize: '16px',
            fill: '#000000ff',
            strokeThickness: 2
        });
        this.cost.setVisible(false);

        this.buttonPlacement = buttonPlacement;
        this.on('pointerdown', () => { 
            this.buttonPlacement.buildTower(active);
        });
    }

    buildButton() {
        if (!this.buildButtonClicked) {
            this.buildButtonClicked = true;
            this.cost.setVisible(true);
            if (this.scene.afford[this.afford] == true) {
                this.buttonDisabled.setVisible(false);
                this.setVisible(true);
                this.enable = true;
            }
            else {
                this.buttonDisabled.setVisible(true);
                this.setVisible(false);
                this.enable = false;
            }
        }
        else {
            this.buildButtonClicked = false;
            this.buttonDisabled.setVisible(false);
            this.setVisible(false);
            this.enable = false;
            this.cost.setVisible(false);
        }
    }

    preUpdate() {
        if (this.buildButtonClicked && this.enable == false && this.scene.afford[this.afford] == true) {
            this.buttonDisabled.setVisible(false);
            this.setVisible(true);
            this.enable = true;
        }

        if (this.buildButtonClicked && this.enable == true && this.scene.afford[this.afford] == false) {
            this.buttonDisabled.setVisible(true);
            this.setVisible(false);
            this.enable = false;
        }
    }

}