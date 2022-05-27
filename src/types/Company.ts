export default interface iCompanyData {
    companies: Array<iCompanies>
}
interface iCompanies {
    [index: number]: { id: any | null; name: string; type: string };
    time_slots: Array<iTimeSlots>;
}
interface iTimeSlots {
    [index: number]: { start_time: string; end_time: string };
}