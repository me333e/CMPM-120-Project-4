import { Start } from '../scenes/Start.js';

export class UI extends Phaser.Scene {
    constructor() {
        super('UI');
    }

    preload() {

    }

    create() {
        
        this.hpText = this.add.text(20, 0, 'HP: 100', { 
            fontSize: '24px', 
            fill: '#fff' 
        }).setOrigin(0);
        
        this.waveText = this.add.text(20, 23, 'Wave 1', { 
            fontSize: '24px', 
            fill: '#fff' 
        }).setOrigin(0);

        this.currencyText = this.add.text(20, 46, 'Currency: 0', { 
            fontSize: '24px', 
            fill: '#fff' 
        }).setOrigin(0);

        let gameScene = this.scene.get('Start');
        if (gameScene) {
            gameScene.events.on('updateHP', this.updateHP, this);
            gameScene.events.on('updateWave', this.updateWave, this);
            gameScene.events.on('updateCurrency', this.updateCurrency, this);
        }
    }

    updateHP(count) {
        this.hpText.setText(`HP: ${count}`);
    }

    updateWave(count) {
        this.waveText.setText(`Wave ${count}`);
    }

    updateCurrency(count) {
        this.currencyText.setText(`Currency: ${count}`);
    }

}   