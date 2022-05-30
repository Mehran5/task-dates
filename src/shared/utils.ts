import moment from "moment";

// format time as per your need
export const formatDateTime = (dateTime: any, dateTimeFormat: string) => moment(dateTime).format(dateTimeFormat);