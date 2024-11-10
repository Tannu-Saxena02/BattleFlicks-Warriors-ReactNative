# BattleFlicks - Warrior App

## Project Overview
RPS Warrior is an interactive React Native application designed to offer users a fun and engaging experience through a classic game of Rock Paper Scissors. The app includes robust authentication mechanisms, profile management, and gameplay features. Users can easily sign up or log in using their email, mobile number, Google, or Facebook accounts. Once authenticated, users can upload and manage their profile pictures using their device's camera or gallery, user can easily play their gsmes smootly with smooth transition and animation 💯.

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
  






##  **_Flow of Application_**
*   **Email Address Registration flow**
<div align="center">
  <img src="https://github.com/user-attachments/assets/5b33c943-8a50-4ad3-8445-63dbcaa8a7e3" alt="Image description" width="200" height="400">
  <img src="https://github.com/user-attachments/assets/0572d74a-e607-428b-adb8-5d935d6447dc" alt="Image description" width="200" height="400">
  <img src="https://github.com/user-attachments/assets/bbf7b3a9-b991-495f-9a4d-372a81e75564" alt="Image description" width="200" height="400">
  <img src="https://github.com/user-attachments/assets/7a2b4951-aed1-4d89-ad7b-4424a5e3755a" alt="Image description" width="200" height="400">
</div> <br><br><br>


*   **Details Screen in Email Address Registration Flow**
 <div align="center"> 
  <img src="https://github.com/user-attachments/assets/83906495-3584-4482-a192-4ed79309f3b8" alt="Image description" width="200" height="400">
  <img src="https://github.com/user-attachments/assets/51ca246a-871a-462e-a2f2-5748f1954aca" alt="Image description" width="200" height="400">
  <img src="https://github.com/user-attachments/assets/cb896dd8-bd69-4efd-9aab-b011275db74d" alt="Image description" width="200" height="400">
  <img src="https://github.com/user-attachments/assets/cb896dd8-bd69-4efd-9aab-b011275db74d" alt="Image description" width="200" height="400"> 
 </div><br><br><br>

 
*   **Phone Number Registration flow**
  <div align="center"> 
<img src="https://github.com/user-attachments/assets/2b610539-93f8-48e1-983a-45216130ceed" alt="Image description" width="200" height="400">
<img src="https://github.com/user-attachments/assets/a84f8975-c7ec-4c11-b70f-7a18bf93ce6d" alt="Image description" width="200" height="400">
<img src="https://github.com/user-attachments/assets/7ba9cd53-1bed-421b-9d7e-b246205504c8" alt="Image description" width="200" height="400">
 </div><br><br><br>

 
*   **Login Screen with Email & Mobile Flow**
<div align="center"> 
<img src="https://github.com/user-attachments/assets/6d7bf4de-0b52-4ec5-ade8-3c1d07945a51" alt="Image description" width="200" height="400">
<img src="https://github.com/user-attachments/assets/6197ac33-e5aa-41cc-b5d2-b5a050b682ec" alt="Image description" width="200" height="400"> 
</div><br><br><br>


*  **Home and Drawer Bar In BattleFlicks**
<div align="center"> 
<img src="https://github.com/user-attachments/assets/95b6ea0b-566e-4635-9b18-960f653986b4" alt="Image description" width="200" height="400">
<img src="https://github.com/user-attachments/assets/45284983-d6f4-4b0a-9a60-d8b7063e3516" alt="Image description" width="200" height="400">
</div><br><br><br>


*   **Game Screen with Draw, Win, Lose Situation**
<div align="center"> 
<img src="https://github.com/user-attachments/assets/92e01853-066e-4a7a-9036-173a2bcf0a97" alt="Image description" width="200" height="400">
<img src="https://github.com/user-attachments/assets/30b5fc35-4a52-4de2-8b19-37fbed9b23cd" alt="Image description" width="200" height="400">
<img src="https://github.com/user-attachments/assets/b5be730c-b47d-47f1-9175-ad655c1bed18" alt="Image description" width="200" height="400">
<img src="https://github.com/user-attachments/assets/aebd2b9e-e49e-40ca-a302-1b84706d03e6" alt="Image description" width="200" height="400">
</div><br><br><br>


*   **Game Screen with Win, Lose in Particular Match**
<div align="center"> 
<img src="https://github.com/user-attachments/assets/d93eea39-6d85-4342-abd3-b5dd79eb7017" alt="Image description" width="200" height="400">
<img src="https://github.com/user-attachments/assets/f853fbf1-575e-4cb4-b872-ef1e0128d973" alt="Image description" width="200" height="400">
</div>


This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.
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
