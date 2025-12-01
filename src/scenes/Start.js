import {FallingSpike} from "../gameobjects/fallingSpike.js";
import {Candy} from "../gameobjects/candy.js";
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

        this.load.spritesheet('basicShooter', 'assets/NovicePyromancer.png', 
            {
                frameWidth: 16,
                frameHeight: 16,
            }
        );

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

        this.anims.create({
                key: "idle",
                frames: this.anims.generateFrameNumbers('basicShooter', {start: 0, end: 4}),
                frameRate: 6,
                repeat: -1
            });

        //will need to make more buttons for every tower area, maybe there's a way to make them all at once
        this.buttons = this.add.group("buttons");

        this.buildButton = this.add.image(496, 130, 'buildButton').setOrigin(0);
        this.buildButton.setInteractive();
        this.buildButton.on('pointerdown', () => { 
            this.buildTower();
        });
        this.buildButtonClicked = false;

        this.basicButton = this.add.image(460, 123, 'basicButton').setOrigin(0);
        this.basicButton.setInteractive();
        this.basicButton.setVisible(false);
        this.basicButton.enable = false;
        this.basicButton.on('pointerdown', () => { 
            this.buildBasic();
        });
        this.basicButtonClicked = false;

        this.basicButtonDisabled = this.add.image(360, 90, 'basicButtonDisabled').setOrigin(0);
        this.basicButtonDisabled.setVisible(false);

        this.buttons.add(this.buildButton);
        this.buttons.add(this.basicButton);

    }

    update(time) {

        this.events.emit('updateHP', this.playerhp);    //use when you want to update hp
        this.events.emit('updateWave', this.wave);      //use when you want to update wave number

    }

    buildTower() {
        if (!this.buildButtonClicked) {
                this.buildButtonClicked = true;         //add conditions to see if player has enough currency to build tower
                this.basicButton.setVisible(true);      //otherwise display the disabled version of the button
                this.basicButton.enable = true;
        }
        else {
                this.buildButtonClicked = false;
                this.basicButton.setVisible(false);
                this.basicButton.enable = false;
        }
    }

    buildBasic() {
            this.buildButtonClicked = false;
            this.buttons.setVisible(false);
            this.buttons.enable = false;

            const basic = new BasicShooter({scene: this, x: 490, y: 145,});
            basic.setDepth(1);
    }


    checkEndGame()      //prob should add if statment to check if player hp has hit 0 yet fo lose end game, we need to also make a win one
    {
        this.scene.stop('UI');
        this.scene.stop("Start");
        this.scene.start('GameOver', /*{highscore: this.high_score}*/);
    }
    
}
