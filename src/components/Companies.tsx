import iCompanyData from "../types/Company";
import { Content, Name, FlexContainer, NoReservedSlots } from "../assets/styling"
import { useEffect, useState } from "react";
import { TimeSlots } from "./TimeSlots";
import { ReservedTimeSlots } from "./ReservedTimeSlots";
import CompanyService from "../services/company.service";
import _ from 'lodash';
import moment from "moment";

export const Companies = () => {
   const [companies, setCompanies] = useState<iCompanyData[]>([]);
   let [globalSlots, setGlobalSlots] = useState([]);

   useEffect(() => {
      retrieveCompanies();
   }, []);


   /**
    * To get all companies
    */
   const retrieveCompanies = () => {
      CompanyService.getAll()
         .then((response: any) => {

            const companies = response.data;

            const weekName = (item: any) => moment(item.start_time, 'YYYY-MM-DD').format('dddd');
            companies.forEach((element: any, index: any) => {
               element.time_slots = _.groupBy(element.time_slots, weekName)
            });

            setCompanies(companies);
         })
         .catch((e: Error) => {
            console.log(e);
         });
   };

   if (companies.length === 0) return null;

   /**
    * To add reserved slots
    */
   const addReservedSlots = (reservedSlot: any, companyIndex: number, slotIndex: number, weekName: any, slots: any) => {

      let companiesDeepCopy = JSON.parse(JSON.stringify(companies));
      companiesDeepCopy[companyIndex].reservedSlots = [{ reservedSlot, slotIndex, weekName }];
      setGlobalSlots(slots);

      setCompanies([...companiesDeepCopy]);
   }

   /**
    * To remove reserved slots
    */
   const removeReservedSlot = (rSlotIndex: number, weekName: string, companyIndex: number) => {
      let companiesDeepCopy = JSON.parse(JSON.stringify(companies));

      companiesDeepCopy[companyIndex].reservedSlots = companiesDeepCopy[companyIndex].reservedSlots.filter((x: any) => x.slotIndex !== rSlotIndex);

      companiesDeepCopy[companyIndex].time_slots = globalSlots;
      companiesDeepCopy[companyIndex].time_slots[weekName].forEach((x: any) => {
         x.disabled = false
      });

      setCompanies([...companiesDeepCopy]);
   }

   /**
    * To render companies, timeslots and reserverd timeslots
    */
   const content = (company: any, companyIndex: any) => {

      company.reservedSlots = company.reservedSlots && company.reservedSlots.length ? company.reservedSlots : [];
      const timeSlots = company.time_slots;
      const { reservedSlots } = company;

      return (
         <Content key={companyIndex}>
            <Name>{company.name}</Name>
            {
               reservedSlots.length ?
                  (
                     reservedSlots.map((x: any) => (
                        <ReservedTimeSlots
                           key={x.slotIndex}
                           reservedSlot={x.reservedSlot}
                           weekName={x.weekName}
                           slotIndex={x.slotIndex}
                           companyIndex={companyIndex}
                           timeSlots={company}
                           removeReservedSlot={removeReservedSlot}
                        />
                     ))
                  ) : < NoReservedSlots > No slot reserved</NoReservedSlots>
            }
            {
               <TimeSlots
                  slots={timeSlots}
                  companyIndex={companyIndex}
                  addReservedSlots={addReservedSlots}
               />
            }
         </Content >
      )

   }

   return (
      <FlexContainer>
         {companies.map((company: any, index: number) => content(company, index))}
      </FlexContainer>
   )
}