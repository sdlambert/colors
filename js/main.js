(function(window, document, undefined) {
	"use strict";

	var rangeLbl,
	    rangeInput,
	    btnGenerate,
	    colorSpace,
	    hueInput,
	    luminosityInput,
	    radioBtns,
	    selected,
	    fragment;

	function init() {
		rangeLbl        = document.getElementById('range-label');
		rangeInput      = document.getElementById('color-range');
		btnGenerate     = document.getElementById('color-generate');
		colorSpace      = document.getElementById('color-space');
		hueInput        = document.getElementById('hue');
		luminosityInput = document.getElementById('luminosity');
		radioBtns       = document.getElementsByClassName('');

		fragment = document.createDocumentFragment();

		updateValue();

		rangeInput.addEventListener('input', updateValue, false);
		btnGenerate.addEventListener('click', generateColors, false);
		//options.addEventListener('change', updateOptions, false);
	}

	function generateColors (e) {

		var colorArray = [],
		    colorObj = {},
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

	function updateOptions (e) {
		var i;

		e.preventDefault();

		for (i = 0; i < options.length; i++){
			if (selected == options[i].id){
				console.log(options[i].id);
			}
		}
	}

	function updateValue() {
		rangeLbl.innerHTML = rangeInput.value;
	}

	function createSwatch (hexValue) {
		var circle = createDiv(),
		    colorLabel = createDiv(),
		    colorSwatch = createDiv();

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

	function createDiv () {
		return document.createElement('div');
	}

	function removeChildren() {
		while (colorSpace.firstChild)
			colorSpace.removeChild(colorSpace.firstChild);
	}


	// add event listener for page load
	window.addEventListener('load', init, false);

})(window, document);