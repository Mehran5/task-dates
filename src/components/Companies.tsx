import iCompanyData from "../types/Company";
import { Content, Name, FlexContainer } from "./styling"
import { useEffect, useState } from "react";
import { TimeSlots } from "./TimeSlots";
import { ReservedTimeSlots } from "./ReservedTimeSlots";
import CompanyService from "../services/company.service";

export const Companies = () => {
   const [companies, setCompanies] = useState<iCompanyData[]>([]);

   useEffect(() => {
      retrieveCompanies();
   }, []);

   const retrieveCompanies = () => {
      CompanyService.getAll()
         .then((response: any) => {
            setCompanies(response.data);
         })
         .catch((e: Error) => {
            console.log(e);
         });
   };

   if (companies.length === 0) return null;

   const addReservedSlots = (reservedSlot: any, companyIndex: number, slotIndex: number) => {
      let tempComapanyState = JSON.parse(JSON.stringify(companies));
      tempComapanyState[companyIndex].reservedSlots.push({ reservedSlot, slotIndex });

      setCompanies(tempComapanyState);
   }

   const removeReservedSlot = (rSlotIndex: number, companyIndex: number) => {
      let tempComapanyState = JSON.parse(JSON.stringify(companies));
      // tempComapanyState[companyIndex].time_slots[rSlotIndex].disabled = false;
      tempComapanyState[companyIndex].reservedSlots = tempComapanyState[companyIndex].reservedSlots.filter((x: any) => x.slotIndex !== rSlotIndex);

      setCompanies(tempComapanyState);
   }

   const content = (company: any, companyIndex: any) => {
      company.reservedSlots = company.reservedSlots && company.reservedSlots.length ? company.reservedSlots : [];
      const timeSlots = company.time_slots;
      const { reservedSlots } = company;

      return (
         <Content key={companyIndex}>
            <Name>{company.name}</Name>
            {
               reservedSlots.map((x: any) => (
                  <ReservedTimeSlots
                     key={x.slotIndex}
                     reservedSlot={x.reservedSlot}
                     slotIndex={x.slotIndex}
                     companyIndex={companyIndex}
                     removeReservedSlot={removeReservedSlot}
                  />
               ))
            }
            {
               timeSlots.map((slot: any, index: number) => (
                  <TimeSlots
                     key={index}
                     slot={slot}
                     companyIndex={companyIndex}
                     slotIndex={index}
                     addReservedSlots={addReservedSlots}
                  />
               ))
            }
         </Content>
      )

   }

   return (
      <FlexContainer>
         {companies.map((company: any, index: number) => content(company, index))}
      </FlexContainer>
   )
}