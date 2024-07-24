## Bachelor Thesis
### Comparison of End-to-End Testframeworks in context of a migration from Flutter to React Native

This thesis investigates and compares various end-to-end test frameworks
for cross-platform applications in the context of a migration from Flutter to
React Native. The aim of the study is to identify an end-to-end test frame-
work that enables the creation of tests equally applicable to both Flutter and
React Native. To this end, the test frameworks Appium and Maestro are eval-
uated and assessed based on defined criteria and a subsequent evaluation
matrix. The findings of the thesis indicate that both tools exhibit specific
strengths and weaknesses, but are suitable for end-to-end testing of cross-
platform applications in the context of a migration


## How to use
### Installation and Configuration
To run the tests you need to run an Android Emulator and have both applications installed.
You can build both applications from scratch by using the corresponding CLIs.

#### Flutter
- Install the Flutter SDK https://docs.flutter.dev/get-started/install
- Go into the project `todoappflutter` via the console and run `flutter build apk`
- Install the created APK into your Android Emulator
#### React Native
- Have `node` installed
- Go into the project `ToDoApp` via the console and run `npm install`
- After that you need to run `npx eas build -p android -e preview`
  - This command asks you to create an account on the Expo website. You'll need this to build the executable APK
  - There's also a prebuilt APK available in the project
- Install the created APK into your Android Emulator
 
### Run the Tests
You should have the Android Emulator running with both applications installed before running the tests.

#### Maestro

- Install the `maestro`-CLI via `curl -Ls "https://get.maestro.mobile.dev" | bash` (only on MacOS or Linux. For Windows check out the documentation: https://maestro.mobile.dev/getting-started/installing-maestro/windows
- Go into the `maestro-tests` folder via the console
- Then into the `server` folder and run `npm install`
- Now you can go back into the `maestro-tests` folder and run the tests via `sh run-test.sh`
  - This starts a Node-Server and the tests aswell

 #### Appium

- Go into the `appium-tests` folder via the console and run `npm install`
- Run the tests via `npm run wdio`
