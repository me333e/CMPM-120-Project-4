
export class TowerButtonPlacement extends Phaser.GameObjects.Sprite {
    constructor({
        scene,
        x = 0,
        y = 0,
        asset
    }) 
    
    {
        super(scene, x, y, asset);
        this.setOrigin(0, 1);
        scene.add.existing(this)
        this.setInteractive();
        this.setVisible(false);
        this.enable = false;
    }

}