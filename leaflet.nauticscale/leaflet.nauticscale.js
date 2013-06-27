L.Control.ScaleNautic = L.Control.Scale.extend({
	options: {
		nautic: false
	},

	_addScales: function(options, className, container) {
		L.Control.Scale.prototype._addScales.call(this, options, className, container);

		var options = this.options;
		if (options.nautic) {
			this._nScale = L.DomUtil.create('div', className + '-line', container);
		}
	},

	_updateScales: function (options, maxMeters) {
		L.Control.Scale.prototype._updateScales.call(this, options, maxMeters);

		var options = this.options;
		if (options.nautic && maxMeters) {
			this._updateNautic(maxMeters);
		}
	},

	_updateNautic: function (maxMeters) {
		var scale = this._nScale,
			maxNauticalMiles = maxMeters / 1852, nauticalMiles;

		if(maxMeters >= 1852) {
			nauticalMiles = L.Control.Scale.prototype._getRoundNum.call(this, maxNauticalMiles);
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
