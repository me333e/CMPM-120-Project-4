import {UpgradeButtonPlacement} from "../gameobjects/upgradeButtonPlacement.js";

export class MovingShooter extends Phaser.GameObjects.Sprite {
    constructor({
        scene,
        x = 0,
        y = 0,
        button
    }) 
    
    {
        super(scene, x, y, 'movingShooter');
        //this.setOrigin(0, 1);
        scene.add.existing(this);
        this.setInteractive();
        this.setScale(2);
        this.play("idleM");

        this.scene = scene;
        this.x = x;
        this.y = y;
        this.button = button;

        this.last_attack = 0;
        this.attack_speed = 3000;
        this.bullet_speed = 200;
        this.damage = 2;

        this.circle = scene.add.circle(x + 13, y - 12, 115, 0x00ff00, 0.35);
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

        scene.tweens.add({
            targets: [this, this.circle],
            angle: { from: 90, to: 90 - 360 },
            duration: 4000,
            ease: 'Linear',
            repeat: -1,
            onUpdate: function (tween, target) {
                let currentAngleRad = Phaser.Math.DegToRad(target.angle);
                target.x = (x + 13) + 70 * Math.cos(currentAngleRad);
                target.y = (y - 12) + 70 * Math.sin(currentAngleRad);
            }
        });

        const upgradeActive = scene.textures.get('upgradeButton');
        const upgradeDisabled = scene.textures.get('upgradeButtonDisabled');
        const deleteActive = scene.textures.get('deleteButton');
        const deleteDisabled = scene.textures.get('deleteButtonDisabled');

        this.buttons = scene.add.group("buttons");

        const upgradeButtons = [
            { active: upgradeActive, disabled: upgradeDisabled, x: x - 20, y: y - 65, afford: "upgrade", cost: '10' },
            { active: deleteActive, disabled: deleteDisabled, x: x + 26, y: y - 65, afford: "delete", cost: '' }
        ];

        upgradeButtons.forEach((placement) => {
            const upgradeButton = new UpgradeButtonPlacement({
                scene: scene, 
                x: placement.x, 
                y: placement.y,
                active: placement.active,
                disabled: placement.disabled,
                afford: placement.afford,
                cost: placement.cost,
                tower: this
            });
            this.buttons.add(upgradeButton);
            this.buttons.add(upgradeButton.buttonDisabled);
            this.buttons.add(upgradeButton.cost);

            this.on('pointerdown', () => { 
                upgradeButton.upgradeButton();
            });
        });

        this.buttons.add(this);
    }

    upgrades(which) {
        if (which.key == 'upgradeButton') {
            this.scene.currency -= 10;
            //remember this one shoots in multiple directions and the upgrade will basically add more directions
        }
        else if (which.key == 'deleteButton') {
            this.scene.currency += 2;
            this.button.rebuildTower();

            this.circle.setVisible(false);
            this.seeCircle = false;
            this.buttons.children.iterate((button) => {
                button.towerClicked = false;
            });
            this.buttons.setVisible(false);
            this.buttons.enable = false;
            this.destroy();
        }
    }
}