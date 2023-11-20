# MOK Javascript SDK

## Usage

- Install the dependencies:

```bash
npm ci
```

- Create an index.html in the root folder, import the module and add the following script:

```
<head>
    ...
    <script type="module" src="/src/browser.main.ts" async="false"></script>
    ...
</head>
<body>
    <script>
        window.onload = function() {
            Mok.init({
                readKey: "<Your Read Key>",
                writeKey: "<Your Write Key>",
                callback: callback // Your callback function to listen to events
            });
        }
    </script>
</body>
```

- Once finished, start the development server using

```
npm run dev
```

- To generate the optimized production build:

```
npm run build
```

The production build will then be available under ```/dist``` directory
