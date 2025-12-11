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

        this.buttons = scene.add.group("buttons");

        const towerButtons = [
            { active: basicB, disabled: basicBD, x: x - 36, y: y - 17, afford: "basic", cost: '5' },
            { active: debuffB, disabled: debuffBD, x: x - 5, y: y - 48, afford: "debuff", cost: '6' },
            { active: rangeB, disabled: rangeBD, x: x + 27, y: y - 17, afford: "rangeMoving", cost: '7' },
            { active: movingB, disabled: movingBD, x: x - 5, y: y + 12, afford: "rangeMoving", cost: '7' },
        ];

        towerButtons.forEach((placement) => {
            const towerButton = new TowerButtonPlacement({
                scene: scene, 
                x: placement.x, 
                y: placement.y,
                active: placement.active,
                disabled: placement.disabled,
                afford: placement.afford,
                cost: placement.cost,
                buttonPlacement: this
            });
            this.buttons.add(towerButton);
            this.buttons.add(towerButton.buttonDisabled);
            this.buttons.add(towerButton.cost);

            this.on('pointerdown', () => { 
                towerButton.buildButton();
            });
        });

        this.buttons.add(this);
    }
    
    buildTower(which) {
        this.buttons.children.iterate((button) => {
            button.buildButtonClicked = false;
        });
        this.buttons.setVisible(false);
        this.buttons.enable = false;

        if (which == 'basicButton') {
            this.scene.currency -= 5;
            const basic = new BasicShooter({scene: this.scene, x: this.x - 5, y: this.y + 7, button: this});
            basic.setDepth(2);
            this.scene.towerGroup.add(basic);
        }
        else if (which == 'debuffButton') {
            this.scene.currency -= 6;
            const basic = new DebuffShooter({scene: this.scene, x: this.x - 9, y: this.y + 7, button: this});
            basic.setDepth(2);
            this.scene.towerGroup.add(basic);   //i never changed the tower variable name but it really doesnt matter
        }
        else if (which == 'rangeButton') {
            this.scene.currency -= 7;
            const basic = new RangeShooter({scene: this.scene, x: this.x - 5, y: this.y + 4, button: this});
            basic.setDepth(2);
            this.scene.towerGroup.add(basic);
        }
        else if (which == 'movingButton') {
            this.scene.currency -= 7;
            const basic = new MovingShooter({scene: this.scene, x: this.x - 7, y: this.y + 9, button: this});
            basic.setDepth(2);
            this.scene.towerGroup.add(basic);
        }
    }

    rebuildTower() {
        this.setVisible(true);
        this.enable = true;
    }

}