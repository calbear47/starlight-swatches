## Basic Usage

The dist folder contains two files which will need to be included in the head of your html document.

`bundle.js` is the javascript file and is required.
`bundle.css` is the css file and is not required, but adds a couple styles for convenience. If you do not include this CSS file, it's highly recommended that your styles should be written.

```js
let swatcher = new Swatches.BuildSwatcher({
	container: 'swatches-container',
	thirdparty_api: 'https://mediacdn.swatches.com',
	selector_id: 'swatches-select',
	swatch_width: 35,
});
```

### Build Source

```
npm run build

```

### Run Tests

```
npm test
```
