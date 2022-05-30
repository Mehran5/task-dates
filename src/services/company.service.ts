import _ from "lodash";
import moment from "moment";
import http from "../http-common";
import iCompanyData from "../types/Company";

/**
 * To retrieve data for all companies
 */
export const getAll = () => {
  return http.get<Array<iCompanyData>>("/companies");
};

/**
 * To group companies timeslots
 */
export const companiesGroupByDay = (companies: any) => {
  const weekName = (item: any) => moment(item.start_time, 'YYYY-MM-DD').format('dddd');
  companies.forEach((element: any) => {
    element.time_slots = _.groupBy(element.time_slots, weekName)
  });
  return companies;
};

/**
 * To add reserved slots
 */
export const addReservedSlots = (
  companies: any,
  reservedSlot: any,
  companyIndex: number,
  slotIndex: number,
  weekName: any
) => {

  let companiesDeepCopy = JSON.parse(JSON.stringify(companies));
  companiesDeepCopy[companyIndex].reservedSlots = [{ reservedSlot, slotIndex, weekName }];
  return companiesDeepCopy;

};

/**
 * To remove reserved slots
 */
export const removeReservedSlots = (
  companies: any,
  rSlotIndex: number,
  weekName: string,
  companyIndex: number,
  slotState: any
) => {

  let companiesDeepCopy = JSON.parse(JSON.stringify(companies));

  companiesDeepCopy[companyIndex].reservedSlots = companiesDeepCopy[companyIndex].reservedSlots.filter((x: any) => x.slotIndex !== rSlotIndex);

  companiesDeepCopy[companyIndex].time_slots = slotState;
  companiesDeepCopy[companyIndex].time_slots[weekName].forEach((x: any) => {
    x.disabled = false
  });

  return companiesDeepCopy;
}

const CompanyService = {
  getAll,
  companiesGroupByDay,
  addReservedSlots,
  removeReservedSlots
};

export default CompanyService;
