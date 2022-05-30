import { useState } from "react";
import styled from "styled-components";
import swal from 'sweetalert';
import PropTypes from 'prop-types';

import { formatDateTime } from "../utils";
import Button from "./Button";

const WeekName = styled.div`
	text-align: center;
    font-size: 16px;
    font-weight: 600;
`;

const SlotDivision = styled.div`
	margin: 10px 0px;
`;

const SlotButton = styled(Button)`
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



export const TimeSlots = ({ slots, companyIndex, addReservedSlots }: any) => {
    let [timeSlots, setTimeSlots] = useState(slots);
    let sortedSlots: any = [];

    /**
     * To select desired timeslots
     */
    const selectSlot = (timeSlot: any, companyIndex: number, slotIndex: number, weekName: string) => {

        swal({
            title: timeSlot,
            text: "Are you sure you want to reserve this timeslot?",
            icon: "warning",
            dangerMode: true,
            buttons: [true, true]
        }).then((willDelete) => {
            if (willDelete) {
                makeReservation(timeSlot, companyIndex, slotIndex, weekName);
            } else {
                return false;
            }
        });


    }

    const makeReservation = (timeSlot: any, companyIndex: number, slotIndex: number, weekName: string) => {

        let timeSlotsDeepCopy = JSON.parse(JSON.stringify(timeSlots));
        timeSlotsDeepCopy[weekName].forEach((x: any) => {
            x.disabled = false
        });
        timeSlotsDeepCopy[weekName][slotIndex].disabled = true;
        setTimeSlots(timeSlotsDeepCopy);

        addReservedSlots(timeSlot, companyIndex, slotIndex, weekName, timeSlotsDeepCopy);
    }

    let weekNames: any = [];
    weekNames = Object.keys(timeSlots);

    return (
        weekNames.map((weekName: any, index: number) => {

            sortedSlots = timeSlots[weekName].sort((date1: any, date2: any) => date1.start_time - date2.start_time);

            return (
                <>
                    <WeekName key={index}>{weekName}</WeekName>
                    {
                        sortedSlots.map((sortedSlot: any, indx: number) => {

                            const startTime = formatDateTime(sortedSlot.start_time, 'hh:mmA');
                            const endTime = formatDateTime(sortedSlot.end_time, 'hh:mmA');
                            const timeSlot = `${startTime} - ${endTime}`;

                            return (
                                <SlotDivision key={indx}>
                                    <SlotButton
                                        text={timeSlot}
                                        clickButton={() => selectSlot(timeSlot, companyIndex, indx, weekName)}
                                        disabled={sortedSlots[indx].disabled}
                                    />
                                </SlotDivision>
                            )

                        })
                    }
                </>
            )

        })
    );
}

TimeSlots.propTypes = {
    slots: PropTypes.object.isRequired,
    companyIndex: PropTypes.number.isRequired,
    addReservedSlots: PropTypes.func.isRequired
};

export default TimeSlots;
