import {FallingSpike} from "../gameobjects/fallingSpike.js";
import {Candy} from "../gameobjects/candy.js";
import {Monster} from "../gameobjects/monster.js";
import {Spike} from "../gameobjects/spike.js";
import {FallingPlatform} from "../gameobjects/fallingPlatform.js";
import {MovingPlatform} from "../gameobjects/movingPlatform.js";
import {AppearingSpike} from "../gameobjects/appearingSpike.js";
import {UI} from '../scenes/UI.js';
import { Checkpoint } from "../gameobjects/checkpoint.js";
import { AppearingPlatform } from "../gameobjects/appearigPlatform.js";


export class Start extends Phaser.Scene {

    constructor() {
        
        super('Start');
    }

    preload() {
        this.load.image('tilesheet', 'assets/TilesetFloor.png');   //insert our own tilesheet here
        this.load.tilemapTiledJSON('tiles', 'assets/project3map.tmj');          //insert our own tmj map

    }

    create() {

        this.map = this.add.tilemap('tiles');
        var tileset = this.map.addTilesetImage('TilesetFloor', 'tilesheet');   //change when we use our own
        
        this.layer = this.map.createLayer("Ground", tileset, 0, 26);            //change to background or decorations
        this.layer2 = this.map.createLayer("Background", tileset, 0, 26);       //change to ground player can place towers on
        this.layer.setDepth(0);
        this.layer2.setDepth(0);

        this.scene.launch('UI');            //we can change to our own later
    }

    update(time) {

    }


    checkEndGame()      //prob should add if statment to check if player hp has hit 0 yet fo lose end game, we need to also make a win one
    {
        this.sound.play('collect');
        this.sound.play('checkpoint');
        this.sound.play('victory');

        this.scene.stop('UI');
        this.scene.stop("Start");
        this.scene.start('GameOver', /*{highscore: this.high_score}*/);
    }
    
}
