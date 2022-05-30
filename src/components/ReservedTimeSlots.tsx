import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import PropTypes from 'prop-types';

const ReservedSlots = styled.div`
	margin: 25px 0px;
	position: relative;
	& > svg {
		color: red;
    	margin-left: 5px;
		cursor: pointer;
	}
`;

const Badge = styled.span`
	background-color: #ad24d4;
	border-radius: 5px;
	color: #fff;
	font-family: "Segoe UI", Roboto;
	padding: 5px 10px 10px 10px;
`;

export const ReservedTimeSlots = ({ reservedSlot, weekName, slotIndex, companyIndex, removeReservedSlot  }: any) => {

	return (
		<ReservedSlots>
			<Badge>{reservedSlot}</Badge>
			<FontAwesomeIcon icon={faTimes} onClick={() => removeReservedSlot(slotIndex, weekName, companyIndex)} />
		</ReservedSlots>
	);

}

ReservedTimeSlots.propTypes = {
	reservedSlot: PropTypes.string.isRequired,
	slotIndex: PropTypes.number.isRequired,
	companyIndex: PropTypes.number.isRequired,
	removeReservedSlot: PropTypes.func.isRequired,
	weekName: PropTypes.string.isRequired
};

export default ReservedTimeSlots;
