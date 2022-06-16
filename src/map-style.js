export const markerStyle = (
	currentAoi,
	currentDataType,
	latestTimestamp,
	aoiMinMax,
) => ({
	id: `markers`,
	source: 'mapbox',
	type: 'circle',
	'source-layer': `land-subsidence_${currentAoi.uuid}_${currentDataType}_${latestTimestamp}_markers`,
	paint: {
		'circle-color': [
			'interpolate',
			['linear'],
			[
				'to-number',
				[
					'get',
					currentDataType === 'vertical'
						? 'verticalTotalDisplacement'
						: currentDataType === 'horizontal'
						? 'horizontalTotalDisplacement'
						: 'totalDisplacement',
				],
			],
			aoiMinMax.min,
			'#ff0000',
			aoiMinMax.max,
			'#0000ff',
		],
	},
});
