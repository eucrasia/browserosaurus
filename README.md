<img src="./designs/icon_squooshed.png" alt="logo" width="100" height="100" align="right" />

# Browserosaurus

If you enjoy using Browserosaurus, please consider supporting its continued
development.

---

<img src="./screenshot.jpg" alt="screenshot" />

---

Browserosaurus is an open-source (MIT license), Electron-based browser prompter
for macOS. It works by setting itself as the default browser; any clicked links
in non-browser apps are now sent to Browserosaurus where it’ll present you with
a menu of all your installed browsers. You may now decide which browser you’d
like to continue opening the link with.

**Browserosaurus only supports the version of macOS that I currently use. Please
see [here](docs/Frequently-Asked-Questions.md) for details.**

## Installation

Installation instructions and alternatives are available on
[https://wstone.io/browserosaurus](https://wstone.io/browserosaurus)

## Development

Ensure you are running the correct version of Node. The repo includes an
`.nvmrc` file that includes the version number I use.

Get repo:

```
git clone git@github.com:will-stone/browserosaurus.git
```

Move to folder:

```
cd browserosaurus
```

Install dependencies:

```
npm i
```

Run Browserosaurus in dev mode:

```
npm start
```

### Finding bundle identifier for an app

```sh
mdls -name kMDItemCFBundleIdentifier -r /Applications/Firefox.app
```

### Browser logos

The browser logos are provided by an excellent project by
[Cătălin Mariș](https://github.com/alrra):
https://github.com/alrra/browser-logos

### Make icon.icns

To build an icns file (app icon) from `src/shared/static/icon/icon.png`, simply
run `npm run icns`.

## Publishing

Setup Keychain for notarization:

```sh
xcrun notarytool store-credentials "AC_PASSWORD" --apple-id "email@example.com" --team-id "team-id" --password "app-password" --keychain "~/Library/Keychains/login.keychain-db"
```

This will create an item called `com.apple.gke.notary.tool` in your `login`
keychain.

- "AC_PASSWORD" is the name to be given to the keychain profile, and can be left
  as-is.
- The apple ID is usually your email address associated with your Apple
  Developer account.
- The Team ID can be found here:
  https://developer.apple.com/account/#!/membership/
- Password is the app-specific password that can be configured here:
  https://appleid.apple.com/account/manage
- I have found it best to store the generated item in the `login` keychain, and
  the location used above is usually where it is found.

App is published on GitHub, the following command will prompt to bump version
number, package, notarize, and make ZIP bundle:

```
npm run release
```

The zip files can then be added to a GitHub release.
