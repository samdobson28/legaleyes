

# Legal Eyes

## Table of Contents
- [Getting Started](#getting-started)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Troubleshooting](#troubleshooting)
- [Future Considerations](#future-considerations)

## Getting Started
These instructions will get your copy of legaleyes up and running on your local machine for development and testing purposes. 

## Technology Stack

- **Frontend:** React Native: TypeScript
- **Backend:** Node.js, Express.js / TODO
- **Database:** MongoDB
- **NLP/ML**: TODO

## Prerequisites
  - brew install node
  - brew install watchman
  - sudo gem install cocoapods (or install a different way. see cocoapods docs [here](https://guides.cocoapods.org/using/getting-started.html))
  - Have latest XCode installed

## Installation

>**Note**: Most of this section was pulled from the create a new React App readme, so some of the links might not be relevant, but still follow steps -1 to 3 to set up the app for development.

### Step -1
- Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/set-up-your-environment) instructions if you haven't worked with RN before. Summarized in the prerequisites section above.

### Step 0: Clone
- git clone the repo
- Then:
```bash
npm install
cd ios && pod install && cd ..
```

### Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start
```

### Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

#### For Android

```bash
# using npm
npm run android
```

#### For iOS

```bash
# using npm
npm run ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

### Step 3: Modifying your App

See Handoff Notes for code description.

### Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

#### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

## Troubleshooting

If you previously installed a global react-native-cli package, please remove it as it may cause unexpected issues:
  - npm uninstall -g react-native-cli @react-native-community/cli

If you are having trouble with iOS, try to reinstall the dependencies by running:
  - cd ios to navigate to the ios folder.
  - bundle install to install Bundler.
  - bundle exec pod install to install the iOS dependencies managed by CocoaPods.

If you see this error after running pod install: "[!] CocoaPods could not find compatible versions for pod "Plaid"" then run:
  - pod update Plaid

For React Native dependency help, check out [React Native CLI Quickstart](https://reactnative.dev/docs/environment-setup).

Simulator won't launch:
- Getting this message? <img width="300" alt="Screenshot 2024-03-19 at 11 09 59 PM" src="https://github.com/Summely/Sumly-Mob/assets/134799184/2586a069-44b7-4c47-b4ac-203a02ff2b72">
- IMPORTANT: build the app thru Xcode, rather than with npx react-native start, so you can see a better error message and find your specific error online. Make sure to build xcworkspace, NOT xccodeproj.
- After doing that, if the error is with flipper, try adding #include \<functional\> to ios/Pods/Flipper/xplat/Flipper/FlipperTransportTypes.h . This fixed it for me. The file is read-only so override that to save. This is a new error may or may not be fixed by CocoaPods soon. It was pushed to their repo when I checked on Mar 19...
- Try restarting PC
- Clear the derived data for your project. Go to Xcode -> Preferences -> Locations -> Derived Data (Click the little arrow) -> Delete the folder for your project.
  
## Future Considerations
  - TODO

## Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
