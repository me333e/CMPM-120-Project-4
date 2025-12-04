import {ButtonPlacement} from "../gameobjects/buttonPlacement.js";

export class TowerButtonPlacement extends Phaser.GameObjects.Sprite {
    constructor({
        scene,
        x = 0,
        y = 0,
        active,
        disabled,
        afford
    }) 
    
    {
        super(scene, x, y, active);
        this.setOrigin(0, 1);
        scene.add.existing(this)
        this.setInteractive();
        this.setVisible(false);
        this.enable = false;
        this.afford = afford;
        this.buildButtonClicked = false;

        this.buttonDisabled = scene.add.image(x, y, disabled).setOrigin(0);
        this.buttonDisabled.setVisible(false);

        this.on('pointerdown', () => { 
            ButtonPlacement.buildTower(active);
        });
    }

    buildButton() {
        if (!this.buildButtonClicked) {
            this.buildButtonClicked = true;
            if (this.afford == true) {
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
        }
    }

    preUpdate() {
        if (this.buildButtonClicked && this.enable == false && this.afford == true) {
            this.buttonDisabled.setVisible(false);
            this.setVisible(true);
            this.enable = true;
        }

        if (this.buildButtonClicked && this.enable == true && this.afford == false) {
            this.buttonDisabled.setVisible(true);
            this.setVisible(false);
            this.enable = false;
        }
    }

}