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
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.enable = false;
        this.afford = afford;
        this.buildButtonClicked = false;

        this.buttonDisabled = scene.add.image(x, y, disabled).setOrigin(0);
        this.buttonDisabled.setVisible(false);

        this.on('pointerdown', () => { 
            this.buildTower(active);
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

    buildTower(which) {
        this.buildButtonClicked = false;
        this.setVisible(false);
        this.enable = false;

        if (which == 'basicButton') {
            this.scene.currency -= 5;
            const basic = new BasicShooter({scene: this.scene, x: this.x - 5, y: this.y + 7,});
            basic.setDepth(2);
            basic.setInteractive();
            basic.on('pointerdown', () => { 
                this.upgrades();
            });
        }
        else if (which == 'debuffButton') {
            this.scene.currency -= 6;
            const basic = new DebuffShooter({scene: this.scene, x: this.x - 5, y: this.y + 7,});
            basic.setDepth(2);
            basic.setInteractive();
            basic.on('pointerdown', () => { 
                this.upgrades();
            });
        }
        else if (which == 'rangeButton') {
            this.scene.currency -= 7;
            const basic = new RangeShooter({scene: this.scene, x: this.x - 5, y: this.y + 7,});
            basic.setDepth(2);
            basic.setInteractive();
            basic.on('pointerdown', () => { 
                this.upgrades();
            });
        }
        else if (which == 'movingButton') {
            this.scene.currency -= 7;
            const basic = new MovingShooter({scene: this.scene, x: this.x - 5, y: this.y + 7,});
            basic.setDepth(2);
            basic.setInteractive();
            basic.on('pointerdown', () => { 
                this.upgrades();
            });
        }
    }

    upgrades() {
        //add the upgrade option and delete option which will give the build button options back and refund some currency
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