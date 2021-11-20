# job-application-app-au-neutralino
 
## Setup
Install dependencies:
```sh
npm i
```

## Development
To run the application first:

```sh
npm run build
```
then
```sh
neu run
```

### Debugging
By default, neutralino runs in a window. 
You can enable the inspector changing the value of `enableinspector` in `settings.json` file.

For more information check Neutralino [documentation](http://neutralino.js.org/docs/#/)

## Release
To create an executable for your application, you run:

```sh
neu release
```
this will create a `dist` folder with the executables for linux, windows and mac platforms.