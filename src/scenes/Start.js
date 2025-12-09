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
        this.load.image('rangeProj', 'assets/ArrowProj.png');
        this.load.image('movingProj', 'assets/Shuriken.png');
        this.load.image('debuffProj', 'assets/debuffProj.png');
        this.load.image('basicProj', 'assets/basicProj.png');

        // JSON
        this.load.json('spawns', 'data/spawns.json');
        this.load.json('waves', 'data/wave.json');

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

        this.load.spritesheet('slime', 'assets/SlimeWalk.png', {
            frameWidth: 48,
            frameHeight: 48,
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
        this.wave = 0;
        this.currency = 0;
        this.timer = 0;

        //this.basicAfford = false;
        //this.debuffAfford = false;
        //this.rangeMovingAfford = false;

        this.afford = {"basic": false, "debuff": false, "rangeMoving": false, "upgrade": false, "delete": true};

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

        this.anims.create({
            key: "slimeWalk",
            frames: this.anims.generateFrameNumbers('slime', {start: 0, end: 5}),
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

        // 1st: load object layer "Pathing"
        // 2nd: go through all objects in that layer
        // 3rd: check if object is spawnpoint or waypoint
        // 4th: if waypoint: store to array of waypoints in order
        // 5th: if spawnpoint: create or spawn monster at that object location

        // step 1
        var sp = this.map.getObjectLayer("Pathing"); // 
        this.waypoints = [];

        // step 2
        sp.objects.forEach((point) => {

            // step 3
            if ( point.properties[0].name == "waypoint" ) { // waypoint

                // step 4
                this.waypoints.push ( new Phaser.Math.Vector2(point.x + 400, point.y + 36) );
            } else {  // spawnpoint

                // step 5
                this.spawnPoint = new Phaser.Math.Vector2(point.x + 400, point.y + 36); // placeholder for spawning location
            }

        });

        this.waypoints.unshift(this.spawnPoint); // add spawn point as first waypoint
        this.enemyGroup = this.add.group();

    }

    newWave()
    {   
        //console.log("Starting wave " + this.wave); debug line
        // wave data from json
        const waveData  = this.cache.json.get('waves')[this.wave - 1]; 
        let spawnIndex = 0;
        for (const [type, count] of Object.entries(waveData)) { // iterate through each enemy type in the wave
            if (["waveNum", "count"].includes(type)) continue; // skip non-enemy entries
            for (let i = 0; i <count; ++i) {
                this.time.delayedCall(spawnIndex * 1000, () => { // spawn each enemy with a delay
                    console.log(`Spawning enemy of type: ${type}`); // debug line
                    const monster = new Monster({
                        scene: this,
                        x: this.spawnPoint.x,
                        y: this.spawnPoint.y,
                        type: type // get type of enemy from wave
                    });
                    //console.log("Spawning enemy at " + this.spawnPoint.x + ", " + this.spawnPoint.y), // debug line
                    console.log("Monster instance: ", monster); // debug line
                    this.enemyGroup.add(monster);
                    new MonsterPathing(this, this.waypoints, monster);

                });
                spawnIndex++;
            }
        }
    }

    update(time, delta) {
        this.timer += delta;
        while (this.timer > 1000) {
            this.currency += 1;
            this.events.emit('updateCurrency', this.currency);
            this.timer -= 1000;
        }

        if (this.currency >= 10) {
            this.afford["basic"] = true;
            this.afford["debuff"] = true;
            this.afford["rangeMoving"] = true;
            this.afford["upgrade"] = true;
        }
        else if (this.currency >= 7) {
            this.afford["basic"] = true;
            this.afford["debuff"] = true;
            this.afford["rangeMoving"] = true;
            this.afford["upgrade"] = false;
        }
        else if (this.currency >= 6) {
            this.afford["basic"] = true;
            this.afford["debuff"] = true;
            this.afford["rangeMoving"] = false;
            this.afford["upgrade"] = false;
        }
        else if (this.currency >= 5) {
            this.afford["basic"] = true;
            this.afford["debuff"] = false;
            this.afford["rangeMoving"] = false;
            this.afford["upgrade"] = false;
        }
        else {
            this.afford["basic"] = false;
            this.afford["debuff"] = false;
            this.afford["rangeMoving"] = false;
            this.afford["upgrade"] = false;
        }

        this.events.emit('updateHP', this.playerhp);    //use when you want to update hp
        this.events.emit('updateWave', this.wave);      //use when you want to update wave number

        // check wave end
        if (this.enemyGroup.children.entries.length == 0) {
            console.log("Wave " + this.wave + " ended."); // debug line
            this.wave += 1;
            this.newWave();
        }
    }

    checkEndGame()      //prob should add if statment to check if player hp has hit 0 yet fo lose end game, we need to also make a win one
    {
        this.scene.stop('UI');
        this.scene.stop("Start");
        this.scene.start('GameOver', /*{highscore: this.high_score}*/);
    }
    
}
