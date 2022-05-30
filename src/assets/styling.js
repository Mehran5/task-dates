import styled from 'styled-components';
import { Button } from '../ui_components/Button';

export const FlexContainer = styled.div `
	display: flex;
	flex-flow: wrap;
	justify-content: center;
`;

export const Content = styled.div `
	border: 1px solid #ebebeb;
	padding: 30px 50px;
	background-color: #eeeeee;
	margin: 60px;
	border-radius: 10px;
	box-shadow: 0px 0px 15px 0px #ebebeb;
	max-height: 635px;
	overflow-x: auto;
`;

export const Name = styled.h2 `
	font-weight: 500;
	font-family: "Segoe UI", Roboto;
	text-align: center;
`;

export const WeekName = styled.div `
	text-align: center;
    font-size: 16px;
    font-weight: 600;
`;

export const SlotDivision = styled.div `
	margin: 10px 0px;
`;

export const SlotButton = styled(Button)
`
	background-color: #3d57ff;
	border: 1px solid #3d57ff;
	color: white;
	padding: 10px 18px;
	font-weight: 400;
	font-family: "Segoe UI", Roboto;
	border-radius: 4px;
	cursor: pointer;
	font-size: 14px;    
	:hover {
			background-color: #263dd6;;
	}
	:disabled {
		opacity: 0.35;
		cursor: not-allowed;
	}
`;

export const NoReservedSlots = styled.div`
	text-align: center;
    padding: 10px 0px;
    // border: 1px solid #3d57ff;
    // background-color: white;
    margin: 15px 0px;
`;

export const ReservedSlots = styled.div `
	margin: 25px 0px;
	position: relative;
	& > svg {
		color: red;
    	margin-left: 5px;
		cursor: pointer;
	}
`;

export const Badge = styled.span `
	background-color: #ad24d4;
	border-radius: 5px;
	color: #fff;
	font-family: "Segoe UI", Roboto;
	padding: 5px 10px 10px 10px;
`;