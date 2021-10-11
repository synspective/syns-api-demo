import React from 'react';
import styled from 'styled-components';

const ControlPanelWrapper = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	max-width: 320px;
	background: #fff;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	padding: 12px 24px;
	margin: 20px;
	font-size: 13px;
	line-height: 2;
	color: #6b6b76;
	outline: none;
`;

const ControlPanel = ({ children }) => {
	return (
		<ControlPanelWrapper>
			<h3>Synspective API Demo</h3>
			<p>Something something blah blah</p>
			{children}
		</ControlPanelWrapper>
	);
};

export default ControlPanel;
