# Notes On Setup

For Submissions:

IOS:

- TBD

Android:

- Create a new project in the Google Cloud Console.
- Create a Service Account on
  the [Service Accounts
  Page](https://console.cloud.google.com/iam-admin/serviceaccounts?project=emojinate&supportedpurview=project).
- [Enable Developer API](https://console.cloud.google.com/apis/library/androidpublisher.googleapis.com?project=emojinate)
- Create a new JSON Key for the service account and download it.
- Create a `secrets` folder in this directory and put the new JSON key in there.
  EAS will recognize the file automatically and use it for submissions to the
  play store.

# React Native + Expo + Firebase + Mobx + Typescript Starter 👋

This repo is the starting point for creating a React Native application using
Expo with Firebase services like Authentication and Cloud Functions. This starter
assumes that you have an Apple Developer Account / Google Play Developer Account
setup and have created bundle identifiers for your app. [Here's how you can
Register an iOS APP ID](https://developer.apple.com/help/account/manage-identifiers/register-an-app-id/.)

---

- [Notes On Setup](#notes-on-setup)
- [React Native + Expo + Firebase + Mobx + Typescript Starter 👋](#react-native--expo--firebase--mobx--typescript-starter-)
  - [What's This Do?](#whats-this-do)
  - [Environment Variables](#environment-variables)
  - [Get started](#get-started)
    - [If Using Expo Application Services (EAS)](#if-using-expo-application-services-eas)
  - [Firebase Configuration](#firebase-configuration)
  - [Hooks](#hooks)
    - [UseAppSetup](#useappsetup)
    - [UseCurrentUser](#usecurrentuser)
    - [UseThemeColors](#usethemecolors)
  - [Other Stuff](#other-stuff)
    - [StyleSheet With Props](#stylesheet-with-props)
    - [Firebase Cloud Functions](#firebase-cloud-functions)
  - [Learn more](#learn-more)
  - [Join the community](#join-the-community)

---

## What's This Do?

It Does:

- [Expo](https://docs.expo.dev/) + Expo Router for navigation
- [Firebase](https://rnfirebase.io/) authentication using react-native-firebase
- Login / Register / Forgot Password Screens with support for Google and Apple
  Login (you'll probably want to style these)
- [MobX](https://mobx.js.org/README.html) for reactive client-side state management
- Theming for Dark and Light modes
- A Handful of helpful UI components for Flex, ThemedText, and ThemedViews
- Use Typescript

It Does Not:

- Have any opinions on styling
- Look great out of the box. Do some design work.

## Environment Variables

**EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID**: Optional. Used in `auth.ts` for Google Login.
Remove if you don't plan on supporting Google login.

**EXPO_PUBLIC_API_URL**: Optional. Used in `firebase.ts` as the base URL for any
google cloud functions. Remove if you aren't using Google Cloud Functions. THIS
IS NOT RELATED TO AUTHENTICATION.

## Get started

1. Install dependencies
   ```bash
   npm install
   ```
2. Copy `.env.sample` into `.env.local`. Update / add any environment variables
   you want.

   ```bash
   cp .env.sample .env.local
   ```

3. Review the `app.json` file and update the following:

   - name
   - slug
   - scheme
   - package

4. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

### If Using Expo Application Services (EAS)

1. Create a new project in EAS and run the `eas init --id <your-app-id>`
   command that it tells you to. This will update `app.json` with your project
   id.
2. Review the `eas.json` file and make any additional updates needed.
3. Download the `google-services.json`(Android) and
   `GoogleService-Info.plist`(iOS) from your Firebase project settings page in
   the Apps section of the Firebase console. If you haven't created any Apps,
   see the Firebase Authentication section below for Firebase configuration instructions.
4. Run the `eas build` command for whichever platform(s) you're developing for.
5. Install the development build on your testing device.

6. Start the app

   ```bash
    npx expo start
   ```

## Firebase Configuration

Before being able to user Firebase in your Application, you need to Register
your app with Firebase(you'll have to create an ). Refer to [Adding Firebase To An
App](https://firebase.google.com/docs/ios/setup) for assistance.

After adding your iOS and/or Android apps to Firebase, you'll see a section in
the Project settings for your apps. Here is where you can download the
`google-services.json` and `GoogleService-Info.plist` files. These files contain
the necessary configuration information to connect your app to the Firebase SDK
that is already provided in this starter.

You'll also need to enable Authentication in the Firebase Console. Make sure
that you add the required providers for Email/Password, Apple, and Google,
respectively.

## Hooks

### UseAppSetup

This hook fires inside of the root `_layout.tsx` file
which can be used to setup stuff for your application. Typically I
have used this to initialize any SDK's for my application, like Purchasing or
Analytics, etc. You could do whatever you want in here but its important to note
here that this hook doesn't block UI, meaning that your app will continue to
load while whatever is happening asynchronously in this hook is being executed,
so don't put anything in here that absolutely needs to be setup before your
application starts.

### UseCurrentUser

This hook listens for changes to authentication state and updates application
state accordingly. It also handle redirecting to the login screen when the
application loads and there is no active user session.

This is a good place to put stuff that involves fetching and returning
additional user data about the current user. For example, if your application
supports in-app subscriptions, this would be a great place to fetch the user's
entitlement information and return it along with current user. Feel free to add
additional `useEffects` and setup additional state as you see fit.

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

### Firebase Cloud Functions

If you look at the `data/api/firebase.ts` file, you'll see an example function
that that accepts a user as an argument and makes a POST HTTP call to

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
