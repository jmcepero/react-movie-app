import moment from "moment";

export const strDateToYear = (str: string | undefined) => {
    moment.locale('en');
    return str !== undefined && str.length > 0 ? moment(str).format('yyyy') : '----';
}