(function(window, document, undefined) {
	"use strict";

	var btnGenerate,
	    btnChangeBackground,
	    rangeInput,
	    hueInput,
	    luminosityInput,
	    masterSwatch;

	function init() {

		btnGenerate         = document.getElementById('color-generate');
		btnChangeBackground = document.getElementById('background');
		rangeInput          = document.getElementById('color-range');
		hueInput            = document.getElementById('hue');
		luminosityInput     = document.getElementById('luminosity');

		updateRangeValue();

		rangeInput.addEventListener('input', updateRangeValue, false);
		btnGenerate.addEventListener('click', generateColors, false);
		btnChangeBackground.addEventListener('click', updateBackground, false);

		masterSwatch = createSwatch();
	}

	function generateColors (e) {

		var fragment   = document.createDocumentFragment(),
		    colorSpace = document.getElementById('color-space'),
		    colorArray = [],
		    colorObj   = {},
		    hue,
		    luminosity;

		e.preventDefault();
		removeChildren(colorSpace);

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

	function updateRangeValue() {
		var rangeLbl = document.getElementById('range-label');
		rangeLbl.innerHTML = rangeInput.value;
	}

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

	function removeChildren(parent) {
		while (parent.firstChild)
			parent.removeChild(parent.firstChild);
	}

	function getBackgroundColor () {
		var hues = ["red", "orange", "green", "blue", "purple", "monochrome"];
		return hues[Math.floor(Math.random() * 6)];
	}

	function updateBackground () {
		var optionSection = document.getElementById('options');

		optionSection.style.backgroundColor = randomColor({
				hue: getBackgroundColor(),
				luminosity: "dark"
			});
	}

	// add event listener for page load
	window.addEventListener('load', init, false);

})(window, document);