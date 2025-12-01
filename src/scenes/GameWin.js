
export class GameWin extends Phaser.Scene {
    constructor() {
        super('GameWin');
    }

    /*init(data) {
        this.highscore = data.highscore;
    }*/

    preload() {
        
    }

    create() {
        this.add.text(375, 50, 'YOU Win', { fontSize: '128px', fill: '#FFF', align: "center" });
        //this.add.text(350, 340, 'High Score: ' + this.highscore, { fontSize: '78px', fill: '#FFF', align: "center" });
        this.add.text(375, 600, 'Press R to restart', { fontSize: '50px', fill: '#FFF', align: "center" });
        this.r = this.input.keyboard.addKey("R", false, true);
    }

    update(time) {
        if (this.r.isDown)
        {
            this.scene.stop('GameWin');
            this.scene.start("Start"/*, {high_score: this.highscore}*/);
        }
    }

}
