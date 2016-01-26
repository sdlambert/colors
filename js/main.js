/*
 * main.js
 * Immediately invoked function expression to contain functions and variables
 *
 */
(function(window, document, undefined) {
	"use strict";

	// "Global" variables

	var btnGenerate,         // button to generate colors
	    btnChangeBackground, // button to change the background of the options
	    rangeInput,          // how many different colors to generate
	    hueInput,            // hue inputs (red, blue, etc.)
	    luminosityInput,     // luminosity inputs (light, dark, etc.)
	    masterSwatch;        // master template containing DOM nodes for swatches

	/*
	 * init() is called on load and grabs all of our primary inputs and
	 * initializes our master swatch
	 */
	function init() {

		btnGenerate         = document.getElementById('color-generate');
		btnChangeBackground = document.getElementById('background');
		rangeInput          = document.getElementById('color-range');
		hueInput            = document.getElementById('hue');
		luminosityInput     = document.getElementById('luminosity');

		updateRangeValue();

		btnGenerate.addEventListener('click', generateColors, false);
		btnChangeBackground.addEventListener('click', updateBackground, false);
		rangeInput.addEventListener('input', updateRangeValue, false);

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
		    colorArray = [],
		    colorObj   = {},
		    hue,
		    luminosity;

		e.preventDefault();
		removeChildren(colorSpace);

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

	/*
	 * getDarkHue() returns a random color from various dark hues
	 *
	 * @return {String} - the hue string
	 */
	function getDarkHue () {
		var hues = ["red", "orange", "green", "blue", "purple", "monochrome"];
		return hues[Math.floor(Math.random() * 6)];
	}
	/*
	 * updateBackground() changes the color of the options background
	 */
	function updateBackground () {
		var optionSection = document.getElementById('options');

		optionSection.style.backgroundColor = randomColor({
				hue: getDarkHue(),
				luminosity: "dark"
			});
	}

	window.addEventListener('load', init, false);

})(window, document);