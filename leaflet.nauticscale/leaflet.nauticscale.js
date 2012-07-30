L.Control.ScaleNautic = L.Control.Scale.extend({
	options: {
		nautic: false
	},

	_addScales: function(options, className, container) {
		this.__proto__._addScales(options, className, container);

		var options = this.options;
		if (options.nautic) {
			this._nScale = L.DomUtil.create('div', className + '-line', container);
		}
	},

	_updateScales: function (options, maxMeters) {
		this.__proto__._updateScales(options, maxMeters);

		var options = this.options;
		if (options.nautic && maxMeters) {
			this._updateNautic(maxMeters);
		}
	},

	_updateNautic: function (maxMeters) {
		var scale = this._nScale,
			maxNauticalMiles = maxMeters / 1852, nauticalMiles;

		if(maxMeters >= 1852) {
			nauticalMiles = this.__proto__._getRoundNum(maxNauticalMiles);
		} else {
			nauticalMiles = maxNauticalMiles > 0.1 ? Math.round(maxNauticalMiles * 10) / 10 : Math.round(maxNauticalMiles * 100) / 100;
		}

		scale.style.width = this._getScaleWidth(nauticalMiles / maxNauticalMiles) + 'px';
		scale.innerHTML = nauticalMiles + ' nm';
	},
});

L.control.scalenautic = function (options) {
	return new L.Control.ScaleNautic(options);
};
