export class TitleScreen extends Phaser.Scene {
    constructor() {
        super('TitleScreen'); // Unique key for the scene
    }

    preload() {

    }
    create() {
        this.add.text(650, 200, 'Slimes, Wolves, and MAGIC', { 
            fontSize: '75px', 
            fill: '#86f745ff' 
        }).setOrigin(0.5);

        this.add.text(650, 550, 'Press SPACE to start!', { 
            fontSize: '48px', 
            fill: '#ef2323ff' 
        }).setOrigin(0.5);

        this.add.text(650, 300, 'Defeat all the waves to win.', { 
            fontSize: '24px', 
            fill: '#fff' 
        }).setOrigin(0.5);

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('Start');
        });
    }

}