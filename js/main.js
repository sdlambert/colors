/*
 * main.js
 * Immediately invoked function expression to contain functions and variables
 *
 */
(function(window, document, undefined) {
	"use strict";

	// "Global" variables

	var rangeInput,          // how many different colors to generate
	    hueInput,            // hue inputs (red, blue, etc.)
	    luminosityInput,     // luminosity inputs (light, dark, etc.)
	    masterSwatch,        // master template containing DOM nodes for swatches
	    colorArray = [];     // color array

	/*
	 * init() is called on load and grabs all of our primary inputs and
	 * initializes our master swatch
	 */
	function init() {

		rangeInput          = document.getElementById('color-range');
		hueInput            = document.getElementById('hue');
		luminosityInput     = document.getElementById('luminosity');

		updateRangeValue();

		rangeInput.addEventListener('input',updateRangeValue, false);
		rangeInput.addEventListener('change', generateColors, false);
		hueInput.addEventListener('change', generateColors, false);
		luminosityInput.addEventListener('change', generateColors, false);

		masterSwatch = createSwatch();
	}

	/*
	 * generateColors() parses our input and generates the specified number of
	 * color swatches given the inputs selected by the user. This is where we
	 * make our calls to the color.js library
	 *
	 * @param  {Event} e - the click event from the button
	 */
	function generateColors (e) {

		var fragment   = document.createDocumentFragment(),
		    colorSpace = document.getElementById('color-space'),
		    rangeLbl   = document.getElementById('range-label'),
		    colorObj   = {},
		    hue,
		    luminosity;

		e.preventDefault();
		removeChildren(colorSpace);

		rangeLbl.innerHTML = rangeInput.value;

		// parse hue and luminosity
		if (hueInput.selectedIndex >= 1) {
			hue = hueInput.options[hueInput.selectedIndex].value;
			colorObj.hue = hue;
		}

		if (luminosityInput.selectedIndex >= 1) {
			luminosity = luminosityInput.options[luminosityInput.selectedIndex].value;
			colorObj.luminosity = luminosity;
		}

		colorObj.count = rangeInput.value;

		colorArray = randomColor(colorObj);
		fillSwatches(colorArray, fragment); // Send array and doc fragment

		colorSpace.appendChild(fragment);
	}

	/**
	 * updateRangeValue() is called when the user moves the range input
	 */
	function updateRangeValue() {
		var rangeLbl = document.getElementById('range-label');
		rangeLbl.innerHTML = rangeInput.value;
	}

	/*
	 * createSwatch() creates the master color swatch template to be used for
	 * all of the generated colors, returning the parent Node
	 *
	 * @return {Node} swatch
	 */
	function createSwatch () {
		var circle = document.createElement('div'),
		    label  = document.createElement('div'),
		    swatch = document.createElement('div');

		circle.classList.add('circle');
		label.classList.add('color-label');
		swatch.classList.add('swatch');
		swatch.appendChild(circle);
		swatch.appendChild(label);

		return swatch;
	}

	/*
	 * fillswatches() takes an array of hex values and creates a swatch for each
	 * using the master swatch template
	 *
	 * @param  {Array} arr               - the array of hex values
	 * @param  {DocumentFragment} parent - fragment to act as our parent Node
	 */
	function fillSwatches (arr, parent) {
 		arr.forEach(function (hexValue) {
 			var swatch = masterSwatch.cloneNode(true);
 			// first child = circle, second child = label
 			swatch.childNodes[0].style.backgroundColor = hexValue;
 			swatch.childNodes[0].setAttribute('title', hexValue);
 			swatch.childNodes[1].appendChild(document.createTextNode(hexValue));

 			parent.appendChild(swatch);
 		});
	}

	/*
	 * removeChildren() takes a parent Node and removes all of its children
	 *
	 * @param  {Node} parent - the parent Node
	 */
	function removeChildren(parent) {
		while (parent.firstChild)
			parent.removeChild(parent.firstChild);
	}

	window.addEventListener('load', init, false);
	window.addEventListener('load', generateColors, false);

})(window, document);