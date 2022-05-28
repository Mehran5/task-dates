import { useState } from "react";
import { formatDateTime } from "../shared/utils";
import { SlotButton } from "./styling";


export const TimeSlots = ({ slot, companyIndex, slotIndex, addReservedSlots }: any) => {
    const [disabled, setDisabled] = useState(false);

    slot.disabled = false;
    const day = formatDateTime(slot.start_time, 'dddd');
    const startTime = formatDateTime(slot.start_time, 'hh:mmA');
    const endTime = formatDateTime(slot.end_time, 'hh:mmA');
    const timeSlot = `${startTime} - ${endTime}`;

    const selectSlot = (timeSlot: any, companyIndex: number, slotIndex: number) => {
        setDisabled(true);
        slot.disabled = true;
        addReservedSlots(timeSlot, companyIndex, slotIndex);
    }

    return (
        <>
            <div>{day}</div>
            <SlotButton
                text={timeSlot}
                clickButton={() => selectSlot(timeSlot, companyIndex, slotIndex)}
                disabled={disabled} />
        </>
    );
}