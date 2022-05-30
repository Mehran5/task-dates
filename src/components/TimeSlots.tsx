import { useState } from "react";
import { formatDateTime } from "../shared/utils";
import { SlotButton, SlotDivision, WeekName } from "../assets/styling";

export const TimeSlots = ({ slots, companyIndex, addReservedSlots, removeDisabled }: any) => {
    let [timeSlots, setTimeSlots] = useState(slots);
    let sortedSlots: any = [];

    /**
     * To select desired timeslots
     */
    const selectSlot = (slot: any, timeSlot: any, companyIndex: number, slotIndex: number, weekName: string) => {
        let timeSlotsDeepCopy = JSON.parse(JSON.stringify(timeSlots));
        timeSlotsDeepCopy[weekName].forEach((x: any) => {
            x.disabled = false
        });
        timeSlotsDeepCopy[weekName][slotIndex].disabled = true;
        timeSlotsDeepCopy[weekName][slotIndex + 1].disabled = true;
        timeSlotsDeepCopy[weekName][slotIndex + 2].disabled = true;
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
                                        clickButton={() => selectSlot(sortedSlot, timeSlot, companyIndex, indx, weekName)}
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