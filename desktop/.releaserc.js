const { gitmojis } = require('gitmojis');

module.exports = {
  branches: ["main"],
  tagFormat: "releases/uploader-ui/v${version}",
  plugins: [
    ["@semantic-release/commit-analyzer", {
      preset: "atom",
      // major: [💥 :boom:]
      // minor: [✨ :sparkles:]
      // patch: [⚡️ :zap:, 🐛 :bug:, 🚑️ :ambulance:, 💄 :lipstick:, 🔒️ :lock:, ⬇️ :arrow_down:, ⬆️ :arrow_up:, 📌 :pushpin:, 📈 :chart_with_upwards_trend:, ➕ :heavy_plus_sign:, ➖ :heavy_minus_sign:, 🔧 :wrench:, 🌐 :globe_with_meridians:, ✏️ :pencil2:, ⏪️ :rewind:, 📦️ :package:, 👽️ :alien:, 🍱 :bento:, ♿️ :wheelchair:, 💬 :speech_balloon:, 🗃️ :card_file_box:, 🚸 :children_crossing:, 📱 :iphone:, 🥚 :egg:, ⚗️ :alembic:, 🔍️ :mag:, 🏷️ :label:, 🚩 :triangular_flag_on_post:, 🥅 :goal_net:, 💫 :dizzy:, 🗑️ :wastebasket:, 🛂 :passport_control:, 🩹 :adhesive_bandage:, 👔 :necktie:]
      releaseRules: gitmojis.reduce((acc, { semver, emoji }) => {
        if (semver) {
          acc.push({ emoji, scope: "desktop", release: semver });
        }
        return acc;
      }, []),
    }],
    "@semantic-release/release-notes-generator",
    ["@semantic-release/npm", {
      npmPublish: false
    }],
    ["@semantic-release/git", {
      assets: ["package.json"],
      message: "chore(release): ${nextRelease.version}\n\n${nextRelease.notes}"
    }],
    ["@semantic-release/exec", {
      prepareCmd: "yarn package:mac && yarn package:mac:zip && yarn package:win && yarn package:win:zip"
    }],
    ["@semantic-release/github", {
      "assets": [
        {
          path: "out/*darwin-x64.zip",
          name: "uploader-macos-${nextRelease.version}.zip",
          label: "MacOS distribution"
        },
        {
          path: "out/*win32-x64.zip",
          name: "uploader-windows-${nextRelease.version}.zip",
          label: "Windows distribution"
        }
      ]
    }]
  ]
}