import React from 'react';
import Panel from './styled-components/panel.styled';

const ControlPanel = ({ children }) => {
	return (
		<Panel>
			<h3>Synspective API Demo</h3>
			<p>Something something blah blah</p>
			{children}
		</Panel>
	);
};

export default ControlPanel;
