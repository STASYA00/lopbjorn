# Simple website with Typescript

Discovering [Typescript](https://www.typescriptlang.org/) after long painful Javascript and especially [ExtendScript](https://extendscript.docsforadobe.dev/introduction/extendscript-overview.html) was a game-changer. Those who prefer object-oriented programming and prioritize clear code structure will definitely share my feelings. Writing frontend applications became as smooth as carbonara sauce on the pasta. The only thing that might add some egg clumps to the sauce is the initial setup, especially if your code uses external packages (which is often the case!). The aim of this article is to set up a minimal TS website that uses external npm modules.

## TLDR;

Instead of setting the entire project yourself, you can clone or fork the [template repo](https://github.com/STASYA00/Typescript_Website_Template) containing all the project files and structure and start developing from there!

## Setup

The project will have the following structure:
```
├── src
│   ├── css
│   │   ├── styles.css
│   ├── html
│   │   ├── index.html
│   ├── js
│   ├── ts
├── .assets
│   ├── images
│   │   ├── img1.png
│   ├── illustrations
│   │   ├── img1.png
├── README.md
├── node_modules
├── package.json
├── package-lock.json 
└── .gitignore
```

What needs to be created manually (minimal structure):

```
├── src
│   ├── css
│   │   ├── styles.css
│   ├── html
│   │   ├── index.html
│   ├── js
│   ├── ts
```

```
$sh
mkdir src
mkdir src/css
mkdir src/html
mkdir src/js
mkdir src/ts
touch src/html/index.html
cd src
```

```src``` is the folder containing all the code
```css``` website's style (duh!)
```html``` html file (double duh!)
```js``` _compiled_ javascript files
```ts``` the heart of the project, all the website's code



## Code 

### HTML

I do not enjoy much writing html syntax, so the efforts for writing this file will be kept as low as possible.

```
<html> 
<head>
    <meta charset="utf-8" />
    <title> Title </title>
    <script src="../js/system.min.js"></script> 
    <script src="../js/named-register.js"></script> 

    <script type="systemjs-module" src="../js/main.js"></script>
    <link rel="stylesheet" href="../css/styles.css" />
  
</head>
  
<body>
    <div id="root"></div>
</body>
</html> 
```
The first two scripts are needed to be able to use javascript file with ```system``` compilation. [Download](https://github.com/STASYA00/Typescript_Website_Template/tree/main/src/js) files and put them into the ```js``` folder. 

For the rest:

```./js/main.js``` - the script that will be run when the website loads
```./css/styles.css``` - the file that defines the style
```<div id="root"></div>``` - an element to which we are going to link all the elements of the website

Javascript file's type is defined as ```systemjs-module``` in order to be able to use modules :blush: .



### Typescript

The idea with Typescript is that the code is written in a type-defined manner with the possibility to use the basic object types (enumerator, interface, class, map, struct etc) and the types are cross-checked between the functions, which leaves less space for bugs! The code is compiled into a corresponding javascript code. It's a beautiful way to take advantage of type programming, clear object and code structure and still having javascript as a "gateway" to html.

We will be using [npm](https://nodejs.org/en/download) as a package manager.

#### TS Setup

```
npm init
```

[Install](https://www.typescriptlang.org/download) Typescript:

```
npm install typescript --save-dev

```

Start a new Typescript project:
```
cd src/ts
tsc --init
```

#### TS code

Create the initial files:
```

touch main.ts
touch module.ts
```

Since the goal is to have a clear structure and a modular code we separate the files' scope. ```main.ts``` is the main function that is called by the ```index.html``` when the site loads. The rest of the program is separated in different classes (and other structures), in separate ```*.ts``` files. ```module.ts``` will contain a minimal imported class implementation:
```
class TestModule{
    value: string
    constructor(){
        this.value = "Test value";
    }
    make(){
        console.log(this.value);
    }
}
export {TestModule};
```

```main.ts``` will import the module and run it:

```
import {TestModule} from "./module";

let module = new TestModule();
module.make();
```
 
#### TS compilation

```
tsc --module system --out ../js/main.js main.ts
```

What did we just do?

```--out``` - the code is compiled into __a single__ javascript file, ```../js/main.js```

```--module``` - the way the code is compiled. 
```system``` allows for smooth external module import __and__ compiling the code into a single javascript file.

Now there should be a ```js/main.js``` file that will be used by the ```index.html```. If you run ```index.html``` in the browser you should see the test messages in the console:
```
start
Test value
```

### External modules

I experience issues with external packages in typescript as often as I make typescript projects :expressionless: 

#### ~~Failed~~ standard import

Let's give it a try and ~~try to~~ import a ```uuid``` [package](https://www.npmjs.com/package/uuid) into our project.

As suggested on the [package page](https://www.npmjs.com/package/uuid) from the root folder:
```
npm install uuid
```
And add import to the ```module.ts``` file, as specified on the [project page](https://www.npmjs.com/package/uuid):
```import { v4 as uuidv4 } from 'uuid';```
and add a line inside the ```TestModule``` ```make``` function:
```let a = uuidv4();```

Visual Code Editor gives the following error :
```
'uuidv4' is declared but its value is never read.ts(6133)
Could not find a declaration file for module 'uuid'. 'c:/Users/00sta/source/repos/Typescript_Website_Template/node_modules/uuid/dist/index.js' implicitly has an 'any' type.
  Try `npm i --save-dev @types/uuid` if it exists or add a new declaration (.d.ts) file containing `declare module 'uuid';`ts(7016)
```
:confused: 
Typescript compiles with option ```--moduleResolution``` set to ```node```:
```
tsc --module system --moduleResolution node --out ../js/main.js main.ts
```
...but the website wouldn't load :confused: :
```
Error: Unable to resolve bare specifier 'uuid' from module (SystemJS Error#8
```

Let's try Visual Code suggestion (from the root folder):
```
npm i --save-dev @types/uuid
```

__Result:__ no error in the editor (!), no compilation error, same error when loading the website in browser :confused:

#### Walkaround

That's where ```SystemJs``` comes to help!
We add our package to the ```systemjs-importmap```. The only disadvantage is the necessity to do it in ```html``` :expressionless: But hopefully it's the last interaction with the file in the entire project!

Add this line:

```
<script type="systemjs-importmap">
      {
        "imports": {
          "uuid": "https://unpkg.com/uuid@8.3.2/dist/umd/uuid.min.js"
        }
      }
    </script>
```
For any other package follow the [link](https://unpkg.com) and find the file relevant to your package!

__Result:__ everything works!

In the console now:
```
start
7e35a84b-9347-43a7-80ed-1b85922cc8df
Test value
```

The final ```html``` looks like this:

```
<html> 
<head>
    <meta charset="utf-8" />
    <title> Title </title>
    <script>
      var exports = {};
    </script>
    <script src="../js/system.min.js"></script> 
    <script src="../js/named-register.js"></script> 

    <script type="systemjs-importmap">
      {
        "imports": {
          "uuid": "https://unpkg.com/uuid@8.3.2/dist/umd/uuid.min.js"
        }
      }
    </script>
    <script type="systemjs-module" src="../js/main.js"></script>
  
    <link rel="stylesheet" href="../css/styles.css" />
  
  </head>
  
  <body>
    <div id="root"></div>
</body>
</html> 
```

All the project files are available in the [repo](https://github.com/STASYA00/Typescript_Website_Template)
