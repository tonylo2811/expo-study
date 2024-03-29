## Software Required
1. Expo Go App on your phone
2. Expo CLI 
```
    npm install -g expo
```
## To run with android emulator:

```
    npx expo run:android
```

## To run with expo go app(recommanded):
1. Start the Application with either command:
```
    expo-cli start --tunnel
    npx expo start --tunnel
```
2. Scan the QR code with your phone
3. Press R in the terminal to reload the app


---
Development Notes:
* use **.jsx** for file mixed with html and js
* use **.js** for file only contain js code
* modify "index.jsx" file in (tabs) folder
* To add screen to a tab:
    1. add a new file in the folder
    2. change screen like either
    ```jsx
        <Link href={"/tabFolder/newScreen"} />
        router.push("/tabFolder/newScreen") //can go back with back button on phone or emulator
        router.replace("/tabFolder/newScreen") //can't go back
    ```
    Note: You can only go back with the back button on your phone or emulator
* To add a new API endpoint:
    1. add logic to controller in backend
    2. add route name in /utils/apis.jsx
