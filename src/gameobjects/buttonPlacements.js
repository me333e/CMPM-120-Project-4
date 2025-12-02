
export class ButtonPlacements extends Phaser.GameObjects.Sprite {
    constructor({
        scene,
        x = 0,
        y = 0,
        where,
    }) 
    
    {
        super(scene, x, y, 'candy');
        this.setOrigin(0, 1);
        scene.add.existing(this);

        
    }

}