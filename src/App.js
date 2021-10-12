import React, { useState, useEffect, useMemo } from 'react';
import MapGL, { Source, Layer } from 'react-map-gl';
import axios from 'axios';
import ControlPanel from './components/control-panel';
import SelectAoiInput from './components/select-aoi-input';
import SelectDataTypeInput from './components/select-data-type-input';
import SelectLayerTypeInput from './components/select-layer-type-input';
import { markerStyle } from './map-style';

const SYNS_API_KEY = ''; // Set your sysnpective API key here
const SYNS_TILE_SERVER_URL = ''; //Set your sysnpective title server url here, it should look something like htps://tiles.synspective.io/v2
const SYNS_API_URL = ''; //Set your sysnpective title server url here, it should look something like htps://api.ldm.synspective.io/v2
const MAPBOX_TOKEN = ''; // Set your mapbox token herere

function App() {
	const [viewport, setViewport] = useState({
		latitude: 34.43317979,
		longitude: 135.24820808,
		zoom: 12,
		bearing: 0,
		pitch: 0,
	});
	const [aoiList, setAoiList] = useState();
	const [currentAoi, setCurrentAoi] = useState();
	const [currentDataType, setCurrentDataType] = useState('ascending'); // ascending, descending, vertical, horizontal
	const [currentLayerType, setCurrentLayerType] = useState('ps-points'); //ps-points, h3-hexagon
	const [selectedFeature, setSelectedFeature] = useState();

	useEffect(() => {
		const getAoiList = () => {
			axios
				.get(`${SYNS_API_URL}/aoi`, {
					params: {
						api_key: SYNS_API_KEY,
						timestamps: true,
					},
				})
				.then((response) => {
					const {
						data: { locations },
					} = response;
					setAoiList(locations);
					setCurrentAoi(locations[0]);
				});
		};

		if (!aoiList) {
			getAoiList();
		}
	}, [aoiList]);

	useEffect(() => {
		if (selectedFeature) {
			console.log(selectedFeature);
		}
	}, [selectedFeature]);

	const aoiMinMax = useMemo(() => {
		if (currentAoi && currentAoi[currentDataType]) {
			const {
				minAndMaxTotalDisplacement: { min, max },
			} = currentAoi[currentDataType];
			console.log({ min, max });
			return { min, max };
		}
	}, [currentAoi, currentDataType]);

	const latestTimestamp = useMemo(() => {
		if (currentAoi && currentAoi[currentDataType]) {
			console.log('ddd', currentAoi);
			const {
				timestamp: { latest },
			} = currentAoi[currentDataType];
			return latest;
		}
	}, [currentAoi, currentDataType]);

	const handleClick = (event) => {
		const {
			features,
			srcEvent: { offsetX, offsetY },
		} = event;
		const selected = features && features[0];
		setSelectedFeature(
			selected
				? {
						feature: selected,
						x: offsetX,
						y: offsetY,
				  }
				: null,
		);
	};

	return (
		<>
			<MapGL
				{...viewport}
				width="100vw"
				height="100vh"
				onViewportChange={setViewport}
				mapboxApiAccessToken={MAPBOX_TOKEN}
				interactiveLayerIds={['markers']}
				onClick={handleClick}
			>
				{currentAoi && (
					<Source
						id={`land-subsidence_${currentAoi.id}_${currentDataType}_${latestTimestamp}_markers`}
						key={`land-subsidence_${currentAoi.id}_${currentDataType}_${latestTimestamp}_markers`}
						type="vector"
						tiles={[
							`${SYNS_TILE_SERVER_URL}/land-subsidence/tiles/${currentAoi.id}/${currentDataType}/${latestTimestamp}/markers/{z}/{x}/{y}?api_key=${SYNS_API_KEY}`,
						]}
						maxzoom={14}
					>
						<Layer
							{...markerStyle(
								currentAoi,
								currentDataType,
								latestTimestamp,
								aoiMinMax,
							)}
						/>
					</Source>
				)}
			</MapGL>
			<ControlPanel>
				<SelectAoiInput
					aoiList={aoiList}
					setCurrentAoi={setCurrentAoi}
				/>
				<SelectDataTypeInput
					currentDataType={currentDataType}
					setCurrentDataType={setCurrentDataType}
				/>
				<SelectLayerTypeInput
					currentLayerType={currentLayerType}
					setCurrentLayerType={setCurrentLayerType}
				/>
			</ControlPanel>
		</>
	);
}

export default App;
