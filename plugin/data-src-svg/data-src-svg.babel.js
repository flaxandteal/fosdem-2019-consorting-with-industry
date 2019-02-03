'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function replaceAttributes(new_, old) {
	for (var i = 0; i < old.attributes.length; i++) {
		var attr = old.attributes[i];
		new_.setAttribute(attr.name, attr.value);
	}
}

/** embed SVGs via data-src
 * e.g. <svg data-src="images/test.svg"></svg>.
 * Useful for styling and using class="fragment" in SVG code
 */
(function(){
	var svgsToLoad = [].concat(_toConsumableArray(document.querySelectorAll('svg[data-src]')));

	var loadSVGs = svgsToLoad.map(function (svg) {
		return fetch(svg.getAttribute('data-src')).then(function (response) {
			return response.text();
		}).then(function (svgCode) {
			var svgDoc = new DOMParser().parseFromString(svgCode, 'image/svg+xml');
			var newSVG = svgDoc.documentElement;
			replaceAttributes(newSVG, svg);
			svg.parentNode.replaceChild(newSVG, svg);
		}).catch(function (error) {
			if (!(error instanceof TypeError)) throw error;
			var img = document.createElement('img');
			img.setAttribute('src', svg.getAttribute('data-src'));
			replaceAttributes(img, svg);
			svg.parentNode.replaceChild(img, svg);
		});
	});

	Promise.all(loadSVGs).then(function (val) {
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = document.querySelectorAll('svg.stretch:not([preserveAspectRatio])')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var svg = _step.value;

				if (!svg.hasAttribute('viewBox')) {
					var w = svg.getAttribute('width');
					var h = svg.getAttribute('height');
					svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
				}
				svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	});
})();
