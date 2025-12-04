import {ButtonPlacement} from "../gameobjects/buttonPlacement.js";
import {TowerButtonPlacement} from "../gameobjects/towerButtonPlacement.js";
import {MonsterPathing} from "../gameobjects/monsterPathing.js";
import {BasicShooter} from "../gameobjects/basicShooter.js";
import {DebuffShooter} from "../gameobjects/debuffShooter.js";
import {RangeShooter} from "../gameobjects/rangeShooter.js";
import {MovingShooter} from "../gameobjects/movingShooter.js";
import {Monster} from '../gameobjects/monster.js';
import {UI} from '../scenes/UI.js';

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
        this.load.image('debuffButton', 'assets/Snow.png');
        this.load.image('debuffButtonDisabled', 'assets/SnowDisabled.png');
        this.load.image('rangeButton', 'assets/Arrow.png');
        this.load.image('rangeButtonDisabled', 'assets/ArrowDisabled.png');
        this.load.image('movingButton', 'assets/Luck.png');
        this.load.image('movingButtonDisabled', 'assets/LuckDisabled.png');
        this.load.image('upgradeButton', 'assets/Upgrade.png');
        this.load.image('upgradeButtonDisabled', 'assets/UpgradeDisabled.png');
        this.load.image('deleteButton', 'assets/Downgrade.png');
        this.load.image('deleteButtonDisabled', 'assets/DowngradeDisabled.png');

        this.load.spritesheet('basicShooter', 'assets/NovicePyromancer.png', {
            frameWidth: 16,
            frameHeight: 16,
        });

        this.load.spritesheet('debuffShooter', 'assets/DeftSorceress.png', {
            frameWidth: 16,
            frameHeight: 16,
        });

        this.load.spritesheet('rangeShooter', 'assets/HalflingRanger.png', {
            frameWidth: 16,
            frameHeight: 16,
        });

        this.load.spritesheet('movingShooter', 'assets/MagicalFairy.png', {
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

        this.monsterPath = new MonsterPathing(this, 224, 16);

        this.scene.launch('UI');            //we can change to our own later
        this.playerhp = 100;
        this.wave = 1;
        this.currency = 0;
        this.timer = 0;

        this.basicAfford = false;
        this.debuffAfford = false;
        this.rangeMovingAfford = false;

        this.anims.create({
            key: "idleB",
            frames: this.anims.generateFrameNumbers('basicShooter', {start: 0, end: 3}),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: "idleD",
            frames: this.anims.generateFrameNumbers('debuffShooter', {start: 0, end: 3}),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: "idleR",
            frames: this.anims.generateFrameNumbers('rangeShooter', {start: 0, end: 3}),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: "idleM",
            frames: this.anims.generateFrameNumbers('movingShooter', {start: 0, end: 3}),
            frameRate: 6,
            repeat: -1
        });

        var bp = this.map.getObjectLayer('buttonPlacements');

        bp.objects.forEach((placement) => {
            const {x, y} = placement;
            const button = new ButtonPlacement({
                scene: this, 
                x: x + 400, 
                y: y + 47, 
                basicB: 'basicButton', 
                basicBD: 'basicButtonDisabled',
                debuffB: 'debuffButton',
                debuffBD: 'debuffButtonDisabled',
                rangeB: 'rangeButton',
                rangeBD: 'rangeButtonDisabled',
                movingB: 'movingButton',
                movingBD: 'movingButtonDisabled'
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

        if (this.currency >= 7) {
            this.basicAfford = true;
            this.debuffAfford = true;
            this.rangeMovingAfford = true;
        }
        else if (this.currency >= 6) {
            this.basicAfford = true;
            this.debuffAfford = true;
            this.rangeMovingAfford = false;
        }
        else if (this.currency >= 5) {
            this.basicAfford = true;
            this.debuffAfford = false;
            this.rangeMovingAfford = false;
        }
        else {
            this.basicAfford = false;
            this.debuffAfford = false;
            this.rangeMovingAfford = false;
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
