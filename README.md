# Emojinate

Emojinate is a mobile application that gives you a random string of Emoji for
you to unleash your imagination upon. Translate emoji into a short story, poem,
song, whatever! Use Emojinate for daily writing prompts, or to break through
that writer's block.

Its available on the [Play Store](https://play.google.com/store/apps/details?id=com.rawms.emojinate&hl=en_US) and [App Store](https://apps.apple.com/ph/app/emojinate/id6730111409?platform=iphone).

- [Emojinate](#emojinate)
  - [About This Project / PreRequisites](#about-this-project--prerequisites)
  - [Get started](#get-started)
  - [State](#state)
  - [Data](#data)
  - [Theming](#theming)
  - [Emoji / Fonts](#emoji--fonts)
  - [Hooks](#hooks)
    - [UseThemeColors](#usethemecolors)
  - [Other Stuff](#other-stuff)
    - [StyleSheet With Props](#stylesheet-with-props)
  - [Learn more](#learn-more)
  - [Join the community](#join-the-community)

---

## About This Project / PreRequisites

Emojinate is built using React Native on the [Expo](https://expo.dev/) platform.
If you want to build this locally, you'll want to [follow their
introduction](https://docs.expo.dev/get-started/introduction/) to get your
environment up and running, if you haven't done so already.

Its a very simple application: only 4 screens total. It uses `mobx` for local
application state, and stores user data on the device in a SQLite database
(again, very small: only 2 tables). It uses `kysely` for SQL querying. There are
no styling or UI libraries used, outside of what comes with Expo.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## State

Local app state is tracked using mobx. Review the `store.ts` file for the store
schema and available actions. This is where most of the application logic
exists.

## Data

Application data is stored locally on-device in a SQLite database. The SQL
schema and migrations can be found in the `data` directory. When the application
first starts it will run the migrations in the `data/migrations`
directory. These are handled using `kysely`.

## Theming

The color scheme for the application can be found at `constants/Colors.ts`. The
application supports both light and dark themes, based on the user's system
setting. Each color must be an array of two colors, one for light mode and one
for dark mode.

## Emoji / Fonts

The list of emoji found at `emoji.json` is copied from the [Google Fonts
emoji-metatadata github
repository](https://github.com/googlefonts/emoji-metadata). The required fonts
are included in this repo in `/assets/fonts/`.

## Hooks

### UseThemeColors

This returns an object containing key:value pairs of the application's theme
based on the User's phone theme (Dark vs Light mode). You can see and modify the
Application Theme in the `constants/Colors` file.

You can use the hook as follows:

```js
const { primary, secondary, background } = useThemeColors();
```

## Other Stuff

### StyleSheet With Props

You can import a special version of `StyleSheet` from `@/types/stylesheet` that
lets you pass in props to a class name. It works like so:

```js

import {StyleSheet} from "@/types/stylesheet";
...

export default function Component() {
   const {background} = useThemeColors()
   return <View style={styles.container(background)}>...</View>
}


const styles = StyleSheet.create({
   container: (backgroundColor) => ({
      backgroundColor: backgroundColor
   })
})

```

This allows you to pass in theme colors to a class name that respect that user's
Phone theme.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
