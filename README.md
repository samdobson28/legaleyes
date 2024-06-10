

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
- **Database:** TODO
- **API**: TODO

### Prerequisites
  - brew install node
  - brew install watchman
  - sudo gem install cocoapods (or install a different way. see cocoapods docs [here](https://guides.cocoapods.org/using/getting-started.html))
  - Have latest XCode installed

### Installation
Pre-run:
1. cd into legaleyes directory
2. npm install
3. cd into ios and pod install (must have cocoapods installed first)

Run:
1. legaleyes % npx react-native start

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
