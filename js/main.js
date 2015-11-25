(function(window, document, undefined) {
	"use strict";

	var rangeLbl,
	    rangeInput,
	    btnGenerate,
	    btnChangeBackground,
	    colorSpace,
	    hueInput,
	    luminosityInput,
	    optionSection,
	    fragment;

	function init() {
		rangeLbl            = document.getElementById('range-label');
		rangeInput          = document.getElementById('color-range');
		btnGenerate         = document.getElementById('color-generate');
		colorSpace          = document.getElementById('color-space');
		hueInput            = document.getElementById('hue');
		luminosityInput     = document.getElementById('luminosity');
		optionSection       = document.getElementById('options');
		btnChangeBackground = document.getElementById('background');

		fragment = document.createDocumentFragment();

		updateRangeValue();

		rangeInput.addEventListener('input', updateRangeValue, false);
		btnGenerate.addEventListener('click', generateColors, false);
		btnChangeBackground.addEventListener('click', updateBackground, false);
	}

	function generateColors (e) {

		var colorArray = [],
		    colorObj   = {},
		    i,
		    hue,
		    luminosity;

		e.preventDefault();
		removeChildren();

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
		colorArray.forEach(createSwatch);

		colorSpace.appendChild(fragment);
	}

	function updateRangeValue() {
		rangeLbl.innerHTML = rangeInput.value;
	}

	function createSwatch (hexValue) {
		var circle      = document.createElement('div'),
		    colorLabel  = document.createElement('div'),
		    colorSwatch = document.createElement('div');

		circle.classList.add('circle');
		circle.style.backgroundColor = hexValue;
		circle.setAttribute('title', hexValue);

		colorLabel.classList.add('color-label');
		colorLabel.appendChild(document.createTextNode(hexValue));

		colorSwatch.classList.add('swatch');
		colorSwatch.appendChild(circle);
		colorSwatch.appendChild(colorLabel);

		fragment.appendChild(colorSwatch);
	}

	function removeChildren() {
		while (colorSpace.firstChild)
			colorSpace.removeChild(colorSpace.firstChild);
	}

	function getBackgroundColor () {
		var hues = ["red", "orange", "green", "blue", "purple", "monochrome"];
		return hues[Math.floor(Math.random() * 6)];
	}

	function updateBackground () {
		optionSection.style.backgroundColor = randomColor({
				hue: getBackgroundColor(),
				luminosity: "dark"
			});
	}

	// add event listener for page load
	window.addEventListener('load', init, false);

})(window, document);