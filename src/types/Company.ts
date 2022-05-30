export default interface iCompanyData {
   time_slots: Array<iTimeSlots>;
   companies: Array<iCompanies>;
}
interface iCompanies {
   [index: number]: { id: any | null; name: string; type: string };
   time_slots: Array<iTimeSlots>;
   reservedSlots: Array<iReservedSlots>
}
interface iTimeSlots {
   start_time: string;
   end_time: string;
   disabled: boolean;
   [index: number]: { start_time: string; end_time: string, disabled: boolean };
}
interface iReservedSlots {
   [index: number]: { start_time: string; end_time: string, disabled: boolean };
}