(function(window, document, undefined) {
	"use strict";

	var rangeLbl,
			rangeInput,
			btnGenerate,
			colorSpace,
			hueInput,
			luminosityInput,
			radioBtns,
			selected;

	function init() {
		rangeLbl        = document.getElementById('range-label');
		rangeInput      = document.getElementById('color-range');
		btnGenerate     = document.getElementById('color-generate');
		colorSpace      = document.getElementById('color-space');
		hueInput        = document.getElementById('hue');
		luminosityInput = document.getElementById('luminosity');
		radioBtns       = document.getElementsByClassName('');

		updateValue();

		rangeInput.addEventListener('input', updateValue, false);
		btnGenerate.addEventListener('click', generateColors, false);
		//options.addEventListener('change', updateOptions, false);
	}

	function updateValue() {
		rangeLbl.innerHTML = rangeInput.value;
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


		// TODO: Figure out best way to configure parameters object

		// For "pretty" random colors
		// for (i = 0; i < rangeInput.value; i++) {
		// 	colorArray[i] = randomColor();
		// 	console.log(colorArray[i]);
		// }

		// For "true" random colors
		// var colorArray = randomColor({
		// 	count:      rangeInput.value,
		// 	luminosity: "random",
		// 	hue:        "random"
		// });

		colorArray.forEach(createCircle);
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

	function createCircle (hexValue) {
		var circle = document.createElement('div');
		circle.classList.add('circle');
		circle.style.backgroundColor = hexValue;
		circle.setAttribute('title', hexValue);
		colorSpace.appendChild(circle);

	}

	function removeChildren() {
		while (colorSpace.firstChild)
			colorSpace.removeChild(colorSpace.firstChild);
	}


	// add event listener for page load
	window.addEventListener('load', init, false);

})(window, document);