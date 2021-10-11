import React from 'react';

const SelectDataTypeInput = ({ currentDataType, setCurrentDataType }) => {
	return (
		<div>
			<label for="layer-type">Choose a data type:</label>
			<select
				name="data-type"
				id="data-type"
				defaultValue={currentDataType}
				onChange={(e) => {
					setCurrentDataType(e.target.value);
				}}
			>
				<option value="ascending">Ascending</option>
				<option value="descending">Descending</option>
				<option value="vertical">Vertical</option>
				<option value="horizontal">Horizontal</option>
			</select>
		</div>
	);
};

export default SelectDataTypeInput;
