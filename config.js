module.exports = {
  name: "",
  networks: [
    "Applovin",
    "Facebook",
    "Moloco",
    "Snapchat",
    "Google",
    "IronSource",
    "Liftoff",
    "TikTok",
    "UnityAds",
    "Vungle",
    "Landing",
    "Mindworks",
  ],
  // customPhaser: true,
  // customPhaserPath: "./phaser.min.js",
  qualityAtlas: [0.6, 0.8],
  qualityTexture: [0.6, 0.8],
  bitrateAudio: 32, // 128, 64, 32, 16
  ios: "https://apps.apple.com/us/app/justplay-earn-loyalty-rewards/id6444946155",
  android:
    "https://play.google.com/store/apps/details/JustPlay_Earn_or_Donate?id=com.justplay.app&hl=uk",
  currentVersion: "default", // после изменения значения нужно заново запустить npm run dev
  versions: {
    default: {
      lang: "en",
      audio: [],
      fonts: [],
      sheets: [],
      spine: [],
      textures: [],
    },
  },
};
