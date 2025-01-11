import ParentScene from "@holywater-tech/ads-builder/framework/components/Scene";
import Background from "@holywater-tech/ads-builder/framework/components/ui/Background";
// import Header from "./Header";
// import Keyboard from "./Shelf";
// import Word from "./Word";
// import { EVENTS, SCALES, WORD } from "./constants/Constants";
// import { Modal } from "./Modal";

// import Buttons from "./Buttons";
// import Title from "./Title";
// import Utils from "@holywater-tech/ads-builder/framework/Utils";
// import { Shelfs } from "./Shelfs";
import Items from "./Items";
import { EVENTS, SCENE } from "./constants/Constants";
import Balance from "./Balance";
import Woman from "./Woman";
import Utils from "@holywater-tech/ads-builder/framework/Utils";

export default class Game extends ParentScene {
  create() {
    this.addBackground("bg1");
    this.addCTA();
    this.initListeners();
    this.sceneNum = -1;
    this.totalCoins = 50.0;
    this.countCoinsBet = 0;
    this.onSwitchScene(SCENE[this.sceneNum]);
    this.addCharacter();
    this.addBalance();
    Utils.addAudio(this, "music_trivia", true, 0.5);
    // setTimeout(() => {
    //   this.finalScene();
    // }, 2000);
  }
  initListeners() {
    this.emitter.on(EVENTS.ON_CHOICE_CLICK, () => this.onSwitchScene());
  }
  showScene1(scene) {
    this.addUIContainer(scene.assets);
  }
  showScene2(scene) {
    this.uiContainer?.removeItems();
    setTimeout(() => {
      this.bg.changeBackground("bg2", true, [1.4, 1.4, 1.1, 1.1]);
      this.addUIContainer(scene.assets);
    }, 1000);
  }
  showScene3(scene) {
    this.uiContainer?.removeItems();
    this.addUIContainer(scene.assets);
  }
  showScene4(scene) {
    this.uiContainer?.removeItems();
    this.addUIContainer(scene.assets);
  }
  showScene5(scene) {
    this.uiContainer?.removeItems();
    this.addUIContainer(scene.assets);
  }

  onSwitchScene() {
    this.sceneNum += 1;
    const scene = SCENE[this.sceneNum];
    // console.log("scene.name)", scene.name);
    switch (scene?.name) {
      case "scene1":
        this.showScene1(scene);
        break;
      case "scene2":
        this.showScene2(scene);
        break;
      case "scene3":
        this.showScene3(scene);
        break;
      case "scene4":
        this.showScene4(scene);
        break;
      case "scene5":
        this.showScene5(scene);
        break;

      default:
        this.uiContainer?.removeItems();
        setTimeout(() => {
          this.finalScene();
        }, 500);

        break;
    }
  }
  finalScene() {
    this.bg.changeBackground("bg2", true, [1.5, 1.5, 1.1, 1.1]);
    this.game.network.addClickToStore(this.bg);
    this.uiContainer?.removeItems();
    this.tweens.add({
      targets: [this.woman, this.balance, this.logo],
      alpha: 0,
      duration: 200,
      delay: 200,
      onComplete: () => {
        this.balance
          .setCustomAlign("Center")
          .setCustomPosition(0, 150, 0, 100)
          .setCustomScale(0.18, 0.18, 0.15, 0.15);
        this.logo
          .setCustomAlign("Center")
          .setCustomPosition(0, -300, 0, -300)
          .setCustomScale(0.5, 0.5, 0.7, 0.7);
      },
    });
    // const scale = this.totalCoins >= 0 ? [0.37, 0.37] : [0.42, 0.42];
    this.title = this.add
      .image(0, 0, this.totalCoins >= 0 ? "title_win" : "title_loose")
      .addProperties(["pos", "scale"])
      .setCustomPosition(0, -100, 0, -100)
      .setCustomScale(0.45, 0.45, 0.365, 0.365)
      .setAlpha(0)
      .setDepth(5);

    this.tweens.add({
      targets: [this.title, this.balance, this.logo],
      alpha: 1,
      duration: 400,
      delay: 500,
    });
    this.mainContainer.add([this.title]);
    this.sort();
  }
  addBackground(bg, options = {}) {
    this.bg = new Background(this, bg, true, [1.5, 1.5, 1.1, 1.1]).setDepth(
      options.depth || 4
    );
    this.mainContainer.add([this.bg]);
    this.sort();
  }
  addUIContainer(options) {
    this.uiContainer = new Items(this, options);
    this.mainContainer.add([this.uiContainer]);
    this.sort();
    this.uiContainer.show();
  }
  addBalance(options) {
    this.balance = new Balance(this, options);
    this.mainContainer.add([this.balance]);
    this.sort();
  }

  addCharacter() {
    this.woman = new Woman(this);
    this.mainContainer.add([this.woman]);
    this.sort();
  }
  addCTA() {
    this.logo = this.add
      .image(0, 0, "atlas", "logo")
      .addProperties(["pos", "scale"])
      .setDepth(37)
      .setCustomAlign("Top Left")
      .setOrigin(0.5, 0.5)
      .setCustomScale(0.7, 0.7, 0.4, 0.4)
      .setCustomPosition(200, 80, 110, 80);
    this.title_m = this.add
      .image(0, 0, "title")
      .addProperties(["pos", "scale"])
      .setDepth(77)
      .setCustomAlign("Bottom")
      .setOrigin(0.5, 0.5)
      .setCustomScale(0.3, 0.3, 0.3, 0.3)
      .setCustomPosition(0, -25, 0, -25);

    this.download = this.add
      .image(0, 0, "atlas", "cta")
      .addProperties(["pos", "scale"])
      .setDepth(37)
      .setCustomAlign("Bottom")
      .setOrigin(0.5, 0.5)
      .setCustomScale(0.6, 0.6, 0.6, 0.6)
      .setCustomPosition(0, -80, 0, -80);
    this.download.setInteractive().on("pointerdown", this.openStore, this);
    this.tweens.add({
      targets: this.download,
      scale: "*=0.9",
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.in",
    });
    // this.download.setInteractive().on('pointerdown', this.scene.openStore, this.scene);

    this.mainContainer.add([this.logo, this.download, this.title_m]);
    this.sort();
  }

  openStore() {
    this.game.network.openStore();
  }
}
