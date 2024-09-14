import Screen from "./Screen";
import { EVENTS, LAYERS_DEPTH } from "./constants/Constants";
// import { POSITIONS, SCALES } from "./constants/Constants";

export default class Balance extends Phaser.GameObjects.Container {
  constructor(scene, count) {
    super(scene, 0, 0);
    this.tweens = scene.tweens;
    this.isPortrait = this.scene.game.size.isPortrait;
    this.countCoin = 50;
    this.addCoinBox();
    // this.addCoins();
    this.initAssets();
    this.initListeners();
  }
  initAssets() {
    this.addProperties(["pos", "scale"])
      .setCustomPosition(-230, 130, -170, 100)
      .setCustomScale(0.25, 0.25, 0.2, 0.2)
      .setCustomAlign("Top Right")
      .setAlpha(1)
      .setDepth(LAYERS_DEPTH.TOP_ASSETS);
  }
  initListeners() {
    this.scene.emitter.on(
      EVENTS.ON_CHOICE_CLICK,
      () => this.changeCount(),
      this
    );
  }
  addCoinBox() {
    // this.countCoin = 4832;
    this.box = this.scene.add
      .image(0, 0, "balance")
      .setDepth(54)
      .setScale(2, 1.7)
      .setAlpha(1)
      .setOrigin(0.5, 0.5);
    this.coinText = this.scene.add
      .text(-200, 0, `$ ${this.numberWithCommas(this.scene.totalCoins)}`, {
        font: `bold 250px Roboto-Medium`,
        fill: "#000",
        // shadow: {
        //   offsetX: 5,
        //   offsetY: 5,
        //   color: "#000",
        //   blur: 10,
        //   stroke: true,
        //   fill: true,
        // },
        letterSpacing: 10,
        stroke: "#012f59",
        strokeThickness: 5,
      })
      .setDepth(120)
      .setAlpha(1)
      .setOrigin(0.5, 0.5);
    this.add([this.coinText, this.box]);
    this._sort();
  }

  changeCount(x, duration = 400) {
    // const coinBet = Object.values(BET[this.scene.footer.text_bet])[0];
    this.animationSecond = this.scene.tweens.addCounter({
      onStart: () => this.setAlpha(1),
      onComplete: () => {
        // this.changeSpeedCoin(50);
        // this.countCoin -= this.scene.countCoinsBet;
        this.scene.totalCoins += this.scene.countCoinsBet;
      },
      from: this.scene.totalCoins,
      to: this.scene.totalCoins + this.scene.countCoinsBet,
      duration,
      onUpdate: (tween) => {
        // this.coinText.text = tween.getValue();
        if (tween.getValue() < 0) {
          this.coinText.setFill("#f51105");
        } else {
          this.coinText.setFill("#000");
        }
        this.coinText.text = `$ ${this.numberWithCommas(
          Math.floor(tween.getValue())
        )}`;
        // if (tween.getValue() > 90000000) {
        //   this.coinText.setFontSize(58);
        // }
        // if (tween.getValue() > 9000000000) {
        //   this.coinText.setFontSize(46);
        //   this.coinText.setOrigin(0.4, 0.5);
        // }
      },
    });
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  addCoins() {
    // this.scene.crySound = Utils.addAudio(this.scene, "cry", 0.5, true);
    const tear = this.scene.add
      .sprite(-210, 0, "atlas", "coin1")
      .setDepth(145)
      .setScale(0.7);
    this.scene.anims.create({
      key: "cry",
      frames: this.scene.anims.generateFrameNames("atlas", {
        prefix: "coin",
        start: 1,
        end: 20,
      }),
      frameRates: 10,
      repeat: -1,
    });

    this.add([tear]);
    this._sort();
    this.animationCry = tear.play("cry");
  }

  changeSpeedCoin(speed) {
    this.animationCry.anims.msPerFrame = speed;
  }
  showBonus() {
    this.scene.tweens.add({
      targets: [this.bonus, this.scratch, this.bonus_card, this.scratch],
      scale: 1,
      alpha: 1,
      duration: 200,
      ease: "Sign.out",
      onComplete: () => this.addScratch(),
    });
    this.scene.tweens.add({
      targets: this.light,
      scale: 1.5,
      alpha: 1,
      duration: 200,
      ease: "Sign.out",
    });
    this.scene.tweens.add({
      targets: this.light,
      angle: 360,
      alpha: 1,
      duration: 4000,
      repeat: -1,
      delay: 300,
      ease: "Sign.out",
    });
  }

  hide() {
    this.scene.tweens.add({
      targets: this,
      scale: 0,
      alpha: 0,
      duration: 300,
      ease: "Sign.out",
    });
  }

  removeHand() {
    this.hand?.destroy();
    this.booster?.destroy();
  }
}