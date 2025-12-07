import {UpgradeButtonPlacement} from "../gameobjects/upgradeButtonPlacement.js";
import {Bullet} from '../gameobjects/bullet.js';

export class BasicShooter extends Phaser.GameObjects.Sprite {
    constructor({
        scene,
        x = 0,
        y = 0
    }) 
    
    {
        super(scene, x, y, 'basicShooter');
        this.setOrigin(0, 1);
        scene.add.existing(this);
        this.setInteractive();
        this.setScale(2);
        this.play("idleB");

        this.scene = scene;
        this.x = x;
        this.y = y;
        this.last_attack = 0;
        this.attack_speed = 3000;
        this.bullet_speed = 200;
        this.damage = 2;
        //this.angle = Phaser.Math.Angle.Between(enemy.x, enemy.y, x, y);

        this.circle = scene.add.circle(x + 13, y - 12, 100, 0x00ff00, 0.4);
        this.circle.setVisible(false);
        scene.physics.add.existing(this.circle);
        this.seeCircle = false;
        this.on('pointerdown', () => { 
            if (!this.seeCircle) {
                this.circle.setVisible(true);
                this.seeCircle = true;
            }
            else {
                this.circle.setVisible(false);
                this.seeCircle = false;
            }
        });

        const upgradeActive = scene.textures.get('upgradeButton');
        const upgradeDisabled = scene.textures.get('upgradeButtonDisabled');
        const deleteActive = scene.textures.get('deleteButton');
        const deleteDisabled = scene.textures.get('deleteButtonDisabled');

        this.buttons = scene.add.group("buttons");

        const upgradeButtons = [
            { active: upgradeActive, disabled: upgradeDisabled, x: x - 22, y: y - 55, afford: "basic" },
            { active: deleteActive, disabled: deleteDisabled, x: x + 24, y: y - 55, afford: "basic" }
        ];

        upgradeButtons.forEach((placement) => {
            const upgradeButton = new UpgradeButtonPlacement({
                scene: scene, 
                x: placement.x, 
                y: placement.y,
                active: placement.active,
                disabled: placement.disabled,
                afford: placement.afford,
                tower: this
            });
            this.buttons.add(upgradeButton);
            this.buttons.add(upgradeButton.buttonDisabled);

            this.on('pointerdown', () => { 
                upgradeButton.upgradeButton();
            });
        });

        this.buttons.add(this);

    }

    upgrades() {
        //add the upgrade option and delete option which will give the build button options back and refund some currency

    }

    /*preUpdate(time) {
        this.scene.physics.world.overlap(this.circle, this.enemy, () => {
            if (this.last_attack + this.attack_speed < time){
                this.last_attack = time;
                let b = new Bullet(this.scene, this.x, this.y, this.angle, this.bullet_speed, this.damage);
            }
        });
    }*/
}