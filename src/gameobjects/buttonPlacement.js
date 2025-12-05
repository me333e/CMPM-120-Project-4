import {BasicShooter} from "../gameobjects/basicShooter.js";
import {DebuffShooter} from "../gameobjects/debuffShooter.js";
import {RangeShooter} from "../gameobjects/rangeShooter.js";
import {MovingShooter} from "../gameobjects/movingShooter.js";
import {TowerButtonPlacement} from "../gameobjects/towerButtonPlacement.js";

export class ButtonPlacement extends Phaser.GameObjects.Sprite {
    constructor({
        scene,
        x = 0,
        y = 0,
        basicB,
        basicBD,
        debuffB,
        debuffBD,
        rangeB,
        rangeBD,
        movingB,
        movingBD
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
        this.debuffActive = false;
        this.rangeActive = false;
        this.movingActive = false;
        //this.buildButtonClicked = false;

        this.buttons = scene.add.group("buttons");

        const towerButtons = [
            { active: basicB, disabled: basicBD, x: x - 36, y: y - 17, afford: "basic" },
            { active: debuffB, disabled: debuffBD, x: x - 5, y: y - 48, afford: "debuff" },
            { active: rangeB, disabled: rangeBD, x: x + 27, y: y - 17, afford: "rangeMoving" },
            { active: movingB, disabled: movingBD, x: x - 5, y: y + 12, afford: "rangeMoving" },
        ];

        towerButtons.forEach((placement) => {
            const towerButton = new TowerButtonPlacement({
                scene: scene, 
                x: placement.x, 
                y: placement.y,
                active: placement.active,
                disabled: placement.disabled,
                afford: placement.afford,
                buttonPlacement: this
            });
            this.buttons.add(towerButton);
            this.buttons.add(towerButton.buttonDisabled);

            this.on('pointerdown', () => { 
                towerButton.buildButton();
            });
        });

        this.buttons.add(this);

        /*
        this.buildButton = scene.add.image(x, y, 'buildButton').setOrigin(0);
        this.buildButton.setInteractive();
        this.buildButton.on('pointerdown', () => { 
            this.buildTower();
        });
        */

        /*
        this.basicButton = scene.add.image(x - 36, y - 17, basicB).setOrigin(0);
        this.debuffButton = scene.add.image(x - 5, y - 48, debuffB).setOrigin(0);
        this.rangeButton = scene.add.image(x + 27, y - 17, rangeB).setOrigin(0);
        this.movingButton = scene.add.image(x - 5, y + 12, movingB).setOrigin(0);
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

        /*this.basicButton = scene.add.image(x - 36, y - 17, basicB).setOrigin(0);
        this.basicButton.setInteractive();
        this.basicButton.setVisible(false);
        this.basicButton.enable = false;
        this.basicButton.on('pointerdown', () => { 
            this.buildBasic();
        });*/

       /* this.basicButtonDisabled = scene.add.image(x - 36, y - 17, basicBD).setOrigin(0);
        this.basicButtonDisabled.setVisible(false);
        this.debuffButtonDisabled = scene.add.image(x - 5, y - 48, debuffBD).setOrigin(0);
        this.debuffButtonDisabled.setVisible(false);
        this.rangeButtonDisabled = scene.add.image(x + 27, y - 17, rangeBD).setOrigin(0);
        this.rangeButtonDisabled.setVisible(false);
        this.movingButtonDisabled = scene.add.image(x - 5, y + 12, movingBD).setOrigin(0);
        this.movingButtonDisabled.setVisible(false);*/

        //this.buttons.add(this.buildButton);
        //this.buttons.add(this.basicButton);
        //this.buttons.add(this.basicButtonDisabled);
    }

    /*buildButton() {
        if (!this.buildButtonClicked) {
            this.buildButtonClicked = true;
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
    }*/

    
    buildTower(which) {
        this.buttons.children.iterate((button) => {
            button.buildButtonClicked = false;
        });
        this.buttons.setVisible(false);
        this.buttons.enable = false;

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
            const basic = new DebuffShooter({scene: this.scene, x: this.x - 9, y: this.y + 7,});
            basic.setDepth(2);
            basic.setInteractive();
            basic.on('pointerdown', () => { 
                this.upgrades();
            });
        }
        else if (which == 'rangeButton') {
            this.scene.currency -= 7;
            const basic = new RangeShooter({scene: this.scene, x: this.x - 5, y: this.y + 4,});
            basic.setDepth(2);
            basic.setInteractive();
            basic.on('pointerdown', () => { 
                this.upgrades();
            });
        }
        else if (which == 'movingButton') {
            this.scene.currency -= 7;
            const basic = new MovingShooter({scene: this.scene, x: this.x - 7, y: this.y + 9,});
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
    

    /*preUpdate() {
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
    }*/

}