L.Control.ScaleCustom = L.Control.Scale.extend({
	options: {
		custom: undefined
	},

	_addScales: function(options, className, container) {
		L.Control.Scale.prototype._addScales.call(this, options, className, container);

		var options = this.options;
		if (options.custom) {
			this._cScale = L.DomUtil.create('div', className + '-line', container);
		}
	},

	_updateScales: function (options, maxMeters) {
		L.Control.Scale.prototype._updateScales.call(this, options, maxMeters);

		var options = this.options;
		if (options.custom && maxMeters) {
			this._updateCustom(maxMeters);
		}
	},

	_updateCustom: function (maxMeters) {
		var scale = this._cScale
			result = this.options.custom(maxMeters, L.Control.Scale.prototype._getRoundNum);
		scale.style.width = this._getScaleWidth(result.ratio) + 'px';
		scale.innerHTML = result.caption;
	},
});

L.control.scalecustom = function (options) {
	return new L.Control.ScaleCustom(options);
};
