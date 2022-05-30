import { useEffect, useState } from "react";
import styled from 'styled-components';

import iCompanyData from "../types/Company";
import { TimeSlots } from "./TimeSlots";
import { ReservedTimeSlots } from "./ReservedTimeSlots";
import CompanyService from "../services/company.service";

const FlexContainer = styled.div`
	display: flex;
	flex-flow: wrap;
	justify-content: center;
`;

const Content = styled.div`
	border: 1px solid #ebebeb;
	padding: 30px 50px;
	background-color: #eeeeee;
	margin: 60px;
	border-radius: 10px;
	box-shadow: 0px 0px 15px 0px #ebebeb;
	max-height: 635px;
	overflow-x: auto;
`;

const Name = styled.h2`
	font-weight: 500;
	font-family: "Segoe UI", Roboto;
	text-align: center;
`;

const NoReservedSlots = styled.div`
	text-align: center;
    padding: 10px 0px;
    margin: 15px 0px;
`;

export const Companies = () => {
   const [companies, setCompanies] = useState<iCompanyData[]>([]);
   let [slotState, setSlotState] = useState([]);

   useEffect(() => {
      retrieveCompanies();
   }, []);


   /**
    * To get all companies
    */
   const retrieveCompanies = () => {
      CompanyService.getAll()
         .then((response: any) => {

            const formatCompanyResponse = CompanyService.companiesGroupByDay(response.data);
            setCompanies(formatCompanyResponse);

         })
         .catch((e: Error) => {
            console.log(e);
         });
   };

   /**
    * To add reserved slots
    */
   const addReservedSlots = (reservedSlot: any, companyIndex: number, slotIndex: number, weekName: any, slots: any) => {

      const companiesWithReservations = CompanyService.addReservedSlots(
         companies,
         reservedSlot,
         companyIndex,
         slotIndex,
         weekName
      );

      setSlotState(slots);
      setCompanies([...companiesWithReservations]);
   }

   /**
    * To remove reserved slots
    */
   const removeReservedSlot = (rSlotIndex: number, weekName: string, companyIndex: number) => {

      const companiesDataWithoutReservations = CompanyService.removeReservedSlots(
         companies,
         rSlotIndex,
         weekName,
         companyIndex,
         slotState
      );

      setCompanies([...companiesDataWithoutReservations]);
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

export default Companies;
