import React from 'react';

const SelectAoiInput = ({ aoiList, setCurrentAoi }) => {
	return (
		<div>
			<label htmlFor="aoi-list">Choose an AOI: </label>
			{aoiList && (
				<select
					name="aoi-list"
					id="aoi-list"
					defaultValue={aoiList[0].id}
					onChange={(e) => {
						const found = aoiList.find((aoi) => {
							return aoi.id === +e.target.value;
						});
						return setCurrentAoi(found);
					}}
				>
					{aoiList.map((aoi) => {
						return (
							<option key={aoi.id} value={aoi.id}>
								{aoi.id}
							</option>
						);
					})}
				</select>
			)}
		</div>
	);
};

export default SelectAoiInput;
