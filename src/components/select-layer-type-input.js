import React from 'react';

const SelectLayerTypeInput = ({ currentLayerType, setCurrentLayerType }) => {
	return (
		<div>
			<label for="layer-type">Choose a layer type: </label>
			<select
				name="layer-type"
				id="layer-type"
				defaultValue={currentLayerType}
				onChange={(e) => {
					setCurrentLayerType(e.target.value);
				}}
			>
				<option value="ps-points">Ps Points</option>
				<option value="h3-hexagon">H3 Hexagon</option>
			</select>
		</div>
	);
};

export default SelectLayerTypeInput;
