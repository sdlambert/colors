(function(window, document, undefined) {
	"use strict";

	var rndmValue,
	    rndmRange,
	    rndmGenerate,
	    colorSpace;

	function init() {
		rndmValue = document.getElementById('random-value');
		rndmRange = document.getElementById('random-range');
		rndmGenerate = document.getElementById('random-generate');
		colorSpace = document.getElementById('color-space');

		updateValue();

		rndmRange.addEventListener("input", updateValue, false);
		rndmGenerate.addEventListener("click", generateRandomColors, false);
		colorSpace.addEventListener("mouseover", showColorValue, false);
	}

	function updateValue () {
		rndmValue.innerHTML = rndmRange.value;
	}

	function generateRandomColors (e) {
		e.preventDefault();
		removeChildren();

		var colorArray = [],
		    i;

		for (i = 0; i < rndmRange.value; i++) {
			colorArray[i] = randomColor();
		}

		colorArray.forEach(createCircle);
	}

	function createCircle (hexValue) {
		var circle = document.createElement("div");
		circle.classList.add("circle");
		circle.style.backgroundColor = hexValue;
		colorSpace.appendChild(circle);
	}

	function showColorValue (e) {
		if (e.target && e.target.nodeName == "DIV") {
			console.log(e.target.style.backgroundColor);
		}
	}

	function removeChildren(e) {
		if(e)
			e.preventDefault();
		while (colorSpace.firstChild)
			colorSpace.removeChild(colorSpace.firstChild);
	}


	// add event listener for page load
	window.addEventListener("load", init, false);

})(window, document);