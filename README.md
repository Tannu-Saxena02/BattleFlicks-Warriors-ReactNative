# RPS Warrior App

## Project Overview
RPS Warrior is an interactive React Native application designed to offer users a fun and engaging experience through a classic game of Rock Paper Scissors. The app includes robust authentication mechanisms, profile management, and gameplay features. Users can easily sign up or log in using their email, mobile number, Google, or Facebook accounts. Once authenticated, users can upload and manage their profile pictures using their device's camera or gallery 💯.

## Features
- **User Authentication:**
  - Email and mobilenumber flow authentication using Firebase.
  - Google and Facebook login via Firebase Authentication.
  - User details stored into firebase.

- **Profile Management:**
  - Users can view,edit and delete their profile photo.
  - Profile photos can be uploaded using the camera or gallery picker.
  - Used Firebase Storage to store the user's profile image.

- **Gameplay:**
  - Play Rock Paper Scissors against the computer.
  - Used animation in Game to give better user expersience.
  - Show up the Scores to the user that He/She lose/win the match
  - Used lottie animation
  - used Sound effect to give best gaming experience.

- **Animations:**
  - Smooth transitions and animations implemented using React Native Animations.
  - Used lottie animation.

## Technologies Used
- **React Native:** For building the mobile application.
- **Firebase:**
  - Authentication for user login.
  - Storage for profile photos.
- **React Native Animations:** For enhancing user experience with animations.
- **React Native Camera and Gallery Picker:** For uploading profile photos.






This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

## Congratulations! :tada:

You've successfully run App. :partying_face:


# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
