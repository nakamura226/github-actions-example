module.exports = {
  branches: ["main"],
  tagFormat: "releases/uploader-ui/v${version}",
  plugins: [
    ["@semantic-release/commit-analyzer", {
      "preset": "conventionalcommits"
    }],
    ["@semantic-release/release-notes-generator", {
      "preset": "conventionalcommits"
    }],
    ["@semantic-release/npm", {
      npmPublish: false
    }],
    ["@semantic-release/git", {
      assets: ["package.json"],
      message: "chore(desktop): release ${nextRelease.version}\n\n${nextRelease.notes}"
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