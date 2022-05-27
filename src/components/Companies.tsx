import moment from "moment";
import iCompanyData from "../types/Company";
import { Content, ContentName, FlexContainer, SlotButton } from "./styling"

export const Companies = ({ companies }: iCompanyData) => {

    if (companies.length === 0) return null;

    const slotView = (slot: any) => {

        const day = moment(slot.start_time).format('dddd');
        const startTime = moment(slot.start_time).format('hh:mmA');
        const endTime = moment(slot.end_time).format('hh:mmA');

        return (
            <>
                <div>{day}</div>
                <SlotButton>
                    {startTime} - {endTime}
                </SlotButton>
            </>
        )

    }

    const content = (company: any, index: any) => {
        const timeSlots = company.time_slots;
        return (
            <Content key={index}>
                <ContentName>{company.name}</ContentName>
                <div><b>reserved</b></div>
                {timeSlots.map((slot: any) => slotView(slot))}
            </Content>
        )

    }

    const companyData = companies.map((company: any, index: number) => content(company, index));

    return (
        <FlexContainer>
            {companyData}
        </FlexContainer>
    )
}