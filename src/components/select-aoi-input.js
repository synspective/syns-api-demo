import React from 'react';

const SelectAoiInput = ({ aoiList, setCurrentAoi }) => {
	console.log(aoiList)
	return (
		<div>
			<label htmlFor="aoi-list">Choose an AOI: </label>
			{aoiList && (
				<select
					name="aoi-list"
					id="aoi-list"
					defaultValue={aoiList[0].uuid}
					onChange={(e) => {
						const found = aoiList.find((aoi) => {
							return aoi.uuid === +e.target.value;
						});
						return setCurrentAoi(found);
					}}
				>
					{aoiList.map((aoi) => {
						return (
							<option key={aoi.uuid} value={aoi.uuid}>
								{aoi.uuid}
							</option>
						);
					})}
				</select>
			)}
		</div>
	);
};

export default SelectAoiInput;
