import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import Panel from './styled-components/panel.styled';

const SelectedMarkerInfoPanel = ({ markerData }) => {
	const chartOptions = useMemo(() => {
		if (markerData && markerData.points) {
			return {
				grid: { top: 8, right: 8, bottom: 24, left: 36 },
				xAxis: {
					type: 'category',
					data: markerData.points.map((point) => point.timestamp),
				},
				yAxis: {
					type: 'value',
				},
				series: [
					{
						data: markerData.points.map(
							(point) => point.displacement,
						),
						type: 'line',
						smooth: true,
					},
				],
				tooltip: {
					trigger: 'axis',
				},
			};
		}
	}, [markerData]);

	if (!chartOptions) return null;

	return (
		<Panel>
			<h3>Selected Marker</h3>
			<div>
				{markerData &&
					Object.keys(markerData).map((key) => {
						if (key !== 'points')
							return (
								<div key={key.id}>
									{key}: {JSON.stringify(markerData[key])}
								</div>
							);
						return null;
					})}
			</div>
			<ReactECharts option={chartOptions} />
		</Panel>
	);
};

export default SelectedMarkerInfoPanel;
