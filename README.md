
# Tailwind CSS to Lit Converter

This package allows us to utilize TailwindCSS from within LitElement components. It is designed to also work with [bun](https://bun.sh/) UNIX systems and it is compatible with WSL2.

## Overview

We need to setup the TailwindCSS build process as normal. Once you have tailwind setup to scan the LitElement for classes and produce a CSS file, TWLit then looks for changes to this file and then creates a JS file from it that can be imported to the Static Styles property of your LitElement. This gives us a nice DX in that Tailwind classes added to your LitElement are automatically generated and can be used with no manual build step required.

This approach also means we use the constructable style sheets functionality that LitElement provides and as such the style sheet will not be duplicated if more than one of our LitElement components are present in the application.

## Usage

### 1. Install the script:

```bash
# node
npm install --save-dev twlitme

# bun
bun install --dev twlitme
```

### 2. Run the script:

```bash
# node
npx twlitme --input <input_file> --output <output_file> [--watch]

# bun
bunx --bun twlitme --input <input_file> --output <output_file> [--watch]
```

Replace `<input_file>` with the path to your Tailwind CSS file and `<output_file>` with the path where you want the JavaScript file to be written.

The `--watch` flag is optional. If provided, the script will keep watching the input file for changes and re-run the conversion whenever the file is modified.

#### Example

```bash
# node
npx twlitme --input ./TailwindGenerated.css --output ./ReadyForLitimport.js --watch

# bun
bunx --bun twlitme --input ./TailwindGenerated.css --output ./ReadyForLitimport.js --watch
```

This command will convert `TailwindGenerated.css` into `ReadyForLitimport.js` and keep watching `TailwindGenerated.css` for changes.


### Or add to your tooling chain in package.json

```json
// package.json

"scripts": {
    "dev" : "twlitme --input ./tw.css --output ./twlit.js --watch"
}
```

The process will constantly watch the input file and output a new JS file on each change.

## License

MIT

## Author

This file was authored by GitHub Copilot.

