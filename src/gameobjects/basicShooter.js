import {UpgradeButtonPlacement} from "../gameobjects/upgradeButtonPlacement.js";

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
}