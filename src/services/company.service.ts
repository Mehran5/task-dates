import http from "../http-common";
import iCompanyData from "../types/Company";

/**
 * To retrieve data for all companies
 * @returns 
 */
const getAll = () => {
  return http.get<Array<iCompanyData>>("/companies");
};

const CompanyService = {
  getAll
};
export default CompanyService;