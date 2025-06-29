const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 400,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 600 },
      debug: false
    }
  },
  scene: { preload, create, update }
};

const game = new Phaser.Game(config);

let mohish, girl, mofiz, bg;
let bgIndex = 0;
const backgrounds = ['bg1', 'bg2', 'bg3'];

function preload() {
  this.load.image('mohish', 'assets/mohish.png');
  this.load.image('girl', 'assets/girl.png');
  this.load.image('mofiz', 'assets/mofiz.png');
  this.load.image('bg1', 'assets/bg1.png');
  this.load.image('bg2', 'assets/bg2.png');
  this.load.image('bg3', 'assets/bg3.png');
  this.load.audio('iloveyou', 'assets/iloveyou.mp3');
  this.load.audio('lemc', 'assets/lemc.mp3');
}

function create() {
  bg = this.add.image(400, 200, 'bg1').setDepth(-1).setScale(2);

  girl = this.physics.add.sprite(700, 300, 'girl').setScale(0.6);
  mohish = this.physics.add.sprite(100, 300, 'mohish').setScale(0.6);
  mofiz = this.physics.add.staticSprite(400, 320, 'mofiz').setScale(0.6);

  // Collision check
  this.physics.add.collider(mohish, mofiz, () => {
    this.sound.play('lemc');
    this.scene.restart();
  });

  // Tap or click to jump
  this.input.on('pointerdown', () => {
    if (mohish.body.touching.down) {
      mohish.setVelocityY(-350);
    }
  });

  // Play voice every 3s
  this.time.addEvent({
    delay: 3000,
    loop: true,
    callback: () => this.sound.play('iloveyou')
  });

  // Background change every 5s
  this.time.addEvent({
    delay: 5000,
    loop: true,
    callback: () => {
      bgIndex = (bgIndex + 1) % backgrounds.length;
      bg.setTexture(backgrounds[bgIndex]);
    }
  });
}

function update() {
  girl.x -= 1;
  if (girl.x < -50) girl.x = 850;
}