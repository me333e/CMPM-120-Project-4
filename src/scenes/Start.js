import {FallingSpike} from "../gameobjects/fallingSpike.js";
import {ButtonPlacement} from "../gameobjects/buttonPlacement.js";
import {Monster} from "../gameobjects/monster.js";
import {Spike} from "../gameobjects/spike.js";
import {FallingPlatform} from "../gameobjects/fallingPlatform.js";
import {BasicShooter} from "../gameobjects/basicShooter.js";
import {AppearingSpike} from "../gameobjects/appearingSpike.js";
import {UI} from '../scenes/UI.js';
import { Checkpoint } from "../gameobjects/checkpoint.js";
import { AppearingPlatform } from "../gameobjects/appearigPlatform.js";


export class Start extends Phaser.Scene {

    constructor() {
        
        super('Start');
    }

    preload() {
        this.load.image('tilesheet', 'assets/TilesetFloor.png');
        this.load.tilemapTiledJSON('tiles', 'assets/project4map.tmj');

        this.load.image('buildButton', 'assets/buildButton.png');
        this.load.image('basicButton', 'assets/Fireball.png');
        this.load.image('basicButtonDisabled', 'assets/FireballDisabled.png');

        this.load.spritesheet('basicShooter', 'assets/NovicePyromancer.png', {
            frameWidth: 16,
            frameHeight: 16,
        });

    }

    create() {
        this.map = this.add.tilemap('tiles');
        var tileset = this.map.addTilesetImage('TilesetFloor', 'tilesheet');
        
        this.layer = this.map.createLayer("Grass", tileset, 400, 50);
        this.layer2 = this.map.createLayer("Path", tileset, 400, 50);
        this.layer3 = this.map.createLayer("TowerGround", tileset, 400, 50);
        this.layer.setDepth(0);
        this.layer2.setDepth(0);
        this.layer3.setDepth(0);

        this.scene.launch('UI');            //we can change to our own later
        this.playerhp = 100;
        this.wave = 1;
        this.currency = 0;
        this.timer = 0;

        this.basicAfford = false;

        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers('basicShooter', {start: 0, end: 3}),
            frameRate: 6,
            repeat: -1
        });

        var bp = this.map.getObjectLayer('buttonPlacements');

        bp.objects.forEach((placement) => {
            const {x, y} = placement;
            const button = new ButtonPlacement({
                scene: this, 
                x: x + 400, 
                y: y + 36, 
                basicB: 'basicButton', 
                basicBD: 'basicButtonDisabled'
            });
            button.setDepth(1);
        });

    }

    update(time, delta) {
        this.timer += delta;
        while (this.timer > 1000) {
            this.currency += 1;
            this.events.emit('updateCurrency', this.currency);
            this.timer -= 1000;
        }

        if (this.currency >= 5) {
            this.basicAfford = true;
        }
        else {
            this.basicAfford = false;
        }

        this.events.emit('updateHP', this.playerhp);    //use when you want to update hp
        this.events.emit('updateWave', this.wave);      //use when you want to update wave number

    }

    checkEndGame()      //prob should add if statment to check if player hp has hit 0 yet fo lose end game, we need to also make a win one
    {
        this.scene.stop('UI');
        this.scene.stop("Start");
        this.scene.start('GameOver', /*{highscore: this.high_score}*/);
    }
    
}
