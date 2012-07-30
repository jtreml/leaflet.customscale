L.Control.ScaleCustom = L.Control.Scale.extend({
	options: {
		custom: undefined
	},

	_addScales: function(options, className, container) {
		this.__proto__._addScales(options, className, container);

		var options = this.options;
		if (options.custom) {
			this._cScale = L.DomUtil.create('div', className + '-line', container);
		}
	},

	_updateScales: function (options, maxMeters) {
		this.__proto__._updateScales(options, maxMeters);

		var options = this.options;
		if (options.custom && maxMeters) {
			this._updateCustom(maxMeters);
		}
	},

	_updateCustom: function (maxMeters) {
		var scale = this._cScale
			result = this.options.custom(maxMeters, this.__proto__._getRoundNum);
		scale.style.width = this._getScaleWidth(result.ratio) + 'px';
		scale.innerHTML = result.caption;
	},
});

L.control.scalecustom = function (options) {
	return new L.Control.ScaleCustom(options);
};
