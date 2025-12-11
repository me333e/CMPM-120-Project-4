import {UpgradeButtonPlacement} from "../gameobjects/upgradeButtonPlacement.js";
import {Bullet} from '../gameobjects/bullet.js';

export class BasicShooter extends Phaser.GameObjects.Sprite {
    constructor({
        scene,
        x = 0,
        y = 0,
        button
    }) 
    
    {
        super(scene, x, y, 'basicShooter');
        this.setOrigin(0, 1);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setInteractive();
        this.setScale(2);
        this.play("idleB");

        this.scene = scene;
        this.x = x;
        this.y = y;
        this.button = button;

        this.last_attack = 0;
        this.attack_speed = 500;
        this.saved_attack_speed = 500;
        this.bullet_speed = 1000;
        this.damage = 2;
        this.bullet_asset = scene.textures.get('basicProj');
        this.enemy = scene.enemyGroup;

        this.circle = scene.add.circle(x + 13, y - 12, 100, 0x00ff00, 0.35);
        this.circle.setVisible(false);
        scene.physics.add.existing(this.circle);
        this.circle.body.setCircle(100);
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
            { active: upgradeActive, disabled: upgradeDisabled, x: x - 22, y: y - 65, afford: "upgrade", cost: '10' },
            { active: deleteActive, disabled: deleteDisabled, x: x + 24, y: y - 65, afford: "delete", cost: '' }
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
            this.attack_speed = 300;
            this.saved_attack_speed = 300;
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

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        let enemy_array = [];

        this.scene.physics.world.overlap(this.circle, this.enemy, (c,e) => {
            enemy_array.push(e);
        });

        if (enemy_array.length > 0) {
            let furthest_enemy = enemy_array[0];
            if (this.last_attack + this.attack_speed < time){
                this.last_attack = time;
                enemy_array.forEach((e) => {
                    if (e.y > furthest_enemy.y) {
                        furthest_enemy = e;
                    }
                })
                let b = new Bullet(this.scene, this.x, this.y, furthest_enemy, this.bullet_speed, this.damage, this.bullet_asset, 0.4);
                this.scene.bulletGroup.add(b);
            }
        }
    }
}