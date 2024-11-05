# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

<h2>Presentation</h2>
This project is intended to be a simple to use music player without any ads. 
I was bothered by apps  that took the liberty of adding ads between my songs. <br/>And out of the four apps I tested, they all did it. So, I decided to start a project to code my own app.<br/> This app is intended to be used with local files, since it's my own personnal need for the moment.<br/>A lot of this code was inspired by <a href="https://www.youtube.com/watch?v=9CElrkFwiBU">this video</a>.<br/> But since it's intended for iOS and with a dummy song library, and I'm on android and want to use it with actual local files, I adapted it.

## Build Yourself

1. Install dependencies with npm or yarn

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
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Implemented features

- Local files reading
- Folders ordering
- Tracks reading
- Tracks queue
- Shuffle
- Search in songs name
- Search in folders name
- Favorites

## Upcoming features

- Playlists
- Maybe some web reading or linking with spotify(and others)
- Playback when app is minimized
