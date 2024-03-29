import React, { useState, useEffect, useMemo } from 'react';
import MapGL, { Source, Layer } from 'react-map-gl';
import axios from 'axios';
import ControlPanel from './components/control-panel';
import SelectAoiInput from './components/select-aoi-input';
import SelectDataTypeInput from './components/select-data-type-input';
import SelectLayerTypeInput from './components/select-layer-type-input';
import { markerStyle } from './map-style';
import SelectedMarkerInfoPanel from './components/selected-marker-info-panel';
import PanelSection from './components/styled-components/panel-section.styled';

const SYNS_API_KEY = ''; // Set your sysnpective API key here
const SYNS_TILE_SERVER_URL = ''; //Set your sysnpective title server url here, it should look something like htps://tiles.synspective.io/v2
const SYNS_API_URL = ''; //Set your sysnpective title server url here, it should look something like htps://api.ldm.synspective.io/v2
const MAPBOX_TOKEN = ''; // Set your mapbox token here

function App() {
	const [viewport, setViewport] = useState({
		latitude: 16.9751,
		longitude: 82.2498,
		zoom: 12,
		bearing: 0,
		pitch: 0,
	});
	const [aoiList, setAoiList] = useState();
	const [currentAoi, setCurrentAoi] = useState();
	const [currentDataType, setCurrentDataType] = useState('ascending'); // ascending, descending, vertical, horizontal
	const [currentLayerType, setCurrentLayerType] = useState('ps-points'); //ps-points, h3-hexagon
	const [selectedFeature, setSelectedFeature] = useState();
	const [markerData, setMarkerData] = useState();

	useEffect(() => {
		const getAoiList = () => {
			axios
				.get(`${SYNS_API_URL}/aoi`, {
					params: {
						api_key: SYNS_API_KEY,
						timestamps: true,
					},
				})
				.then(({data}) => {

					setAoiList(data.data);
					setCurrentAoi(data.data[0]);
				});
		};

		if (!aoiList) {
			getAoiList();
		}
	}, [aoiList]);

	useEffect(() => {
		const getSelectedFeature = (markerId) => {
			axios
				.get(`${SYNS_API_URL}/markers/${markerId}`, {
					params: {
						api_key: SYNS_API_KEY,
						timestamps: true,
					},
				})
				.then((response) => {
					const {
						data: { marker },
					} = response;
					setMarkerData(marker);
				});
		};

		if (selectedFeature) {
			const {
				feature: { id },
			} = selectedFeature;
			getSelectedFeature(id);
		}
	}, [selectedFeature]);

	const aoiMinMax = useMemo(() => {
		if (currentAoi && currentAoi[currentDataType]) {
			const {
				minAndMaxTotalDisplacement: { min, max },
			} = currentAoi[currentDataType];

			return { min, max };
		}
		return { min: 0, max: 0 };
	}, [currentAoi, currentDataType]);

	const latestTimestamp = useMemo(() => {
		if (currentAoi && currentAoi[currentDataType]) {
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
						id={`land-subsidence_${currentAoi.uuid}_${currentDataType}_${latestTimestamp}_markers`}
						key={`land-subsidence_${currentAoi.uuid}_${currentDataType}_${latestTimestamp}_markers`}
						type="vector"
						tiles={[
							`${SYNS_TILE_SERVER_URL}/land-subsidence/tiles/${currentAoi.uuid}/${currentDataType}/${latestTimestamp}/markers/{z}/{x}/{y}?api_key=${SYNS_API_KEY}`,
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
			<PanelSection>
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
				<SelectedMarkerInfoPanel markerData={markerData} />
			</PanelSection>
		</>
	);
}

export default App;
