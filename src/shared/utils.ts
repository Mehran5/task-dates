import moment from "moment";

export const formatDateTime = (dateTime: any, dateTimeFormat: string) => moment(dateTime).format(dateTimeFormat);