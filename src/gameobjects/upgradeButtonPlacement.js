
export class UpgradeButtonPlacement extends Phaser.GameObjects.Sprite {
    constructor({
        scene,
        x = 0,
        y = 0,
        active,
        disabled,
        afford,
        cost,
        tower
    }) 
    
    {
        super(scene, x, y, active);
        this.setOrigin(0);
        scene.add.existing(this);
        this.setInteractive();
        this.setVisible(false);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.enable = false;
        this.afford = afford;
        this.towerClicked = false;

        this.buttonDisabled = scene.add.image(x, y, disabled).setOrigin(0);
        this.buttonDisabled.setVisible(false);
        this.cost = scene.add.text(x + 18, y + 15, cost, {
            fontSize: '16px',
            fill: '#000000ff',
            strokeThickness: 2
        });
        this.cost.setVisible(false);

        this.tower = tower;
        this.on('pointerdown', () => { 
            this.tower.upgrades();
        });
    }

    upgradeButton() {
        if (!this.towerClicked) {
            this.towerClicked = true;
            this.cost.setVisible(true);
            if (this.scene.afford[this.afford] == true) {
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
            this.towerClicked = false;
            this.buttonDisabled.setVisible(false);
            this.setVisible(false);
            this.enable = false;
            this.cost.setVisible(false);
        }
    }

    preUpdate() {
        if (this.towerClicked && this.enable == false && this.scene.afford[this.afford] == true) {  //need to add price of upgrade and
            this.buttonDisabled.setVisible(false);                                                  //delete button to the afford dictionary
            this.setVisible(true);
            this.enable = true;
        }

        if (this.towerClicked && this.enable == true && this.scene.afford[this.afford] == false) {
            this.buttonDisabled.setVisible(true);
            this.setVisible(false);
            this.enable = false;
        }
    }

}