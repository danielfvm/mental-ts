# mental-ts
Write addons for the [mental engine](https://mentalgames.org/) with TypeScript.

## Why?
Types allow you to write safer code that won't have runtime errors duo to missspelling or using the wrong method name. 
![image](https://github.com/user-attachments/assets/d8642730-4ae5-4e10-aa21-f95157c0b207)

It also allows for better integration in your IDE with proper intellisense. Documentation and example codes can directly be added to the type declarations.
![image](https://github.com/user-attachments/assets/0edaf67f-a9de-4d99-86e2-e23d1dbb845f)
![image](https://github.com/user-attachments/assets/30c4671f-c9fc-414c-8a16-dd305280c5bf)

Classes are supported by TypeScript out of the box and do not require some magic non-standardized lua code / preprocessor to implement them.
![image](https://github.com/user-attachments/assets/2e52529c-7795-4d86-94d8-cb79ab10baf4)


## How?
This project uses [TypeScriptToLua](https://github.com/TypeScriptToLua/TypeScriptToLua) to generate lua code from TypeScript. The generated lua files together
with any other valid asset file (images, audio, etc) will be bundled together to an addon. See [build.js](./build.js) for more details.


## Setup
Download the project and run the `setup` script which will download the Engine / Sonic Game from the [offical website](https://mentalgames.org/game/1), extract and renames it automatically. Then install the dependencies and you should be able to write your own addons. See the instructions below for more a detailed setup for your OS.
### Linux
```
git clone https://github.com/danielfvm/mental-ts
cd mental-ts
./setup.sh
npm install
```
### Windows
Not yet tested - `setup.ps1` and `build.js` might now work. If that is the case please download the game manually, extract it and rename the folder to `mental` (place it in the project's root folder). You also might need to rename the paths inside the `package.json`>`scripts` to include the `.exe`.  
```
git clone https://github.com/danielfvm/mental-ts
cd mental-ts
.\setup.ps1
npm install
```

## Config
Inside the `mntconfig.json` you can configure your plugin.
```js
{
  "output": "./mental/addons/my_addon",  // Generated addon destination path + name 
  "assets": [ "src/", "sounds/", "textures/", "scenes/" ], // Folders that build.js will look for assets
  "autorun": [ "./src/index.lua" ] // Scripts that should be run at startup
}
```

## Write an addon
See [index.ts](./src/index.ts) for an example typescript addon that loads on startup. You can add your textures, audio, font, etc to the `src/` folder or alternatively you can create separate folders for a more organized project structure. If you do so make sure to specify the new asset folder in the `mntconfig.json`!

## Run
To start the game with your addon run:
```
npm run release
```

If you additionaly want to have the imgui debug window run:
```
npm run debug
```

## Todo
* [ ] Support entities / figure out how to move `Entity` class out of `src/index.ts` to `/mental-types/`
* [ ] Add missing type declarations, see [this](/mental-types/index.d.ts)
* [ ] Add better comments with examples to type declarations
* [x] Move declaration to own package
* [ ] Support for windows / test if [setup.ps1](/setup.ps1) and [build.js](/build.js) work.
