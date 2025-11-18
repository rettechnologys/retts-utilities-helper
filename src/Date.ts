import Moment, { MomentInput } from 'moment';

export function isValidDate(d: MomentInput, format: string): boolean {
  return Moment(d, format , true).isValid();
}

export function formatMomentDate(
  d: MomentInput,
  format = 'YYYY-MM-DDTHH:mm:ssZ',
  locale = 'id',
) {
  const moment = Moment(d);

  if (locale) {
    moment.locale(locale);
  }

  return moment.format(format);
}

export const objStrDateToDate = (data: any, format = 'YYYY-MM-DDTHH:mm:ssZ') => {
  const newData: any = Array.isArray(data) ? [] : {};

  Object.keys(data).forEach((key) => {
    if (data[key] === Object(data[key]))
      newData[key] = objStrDateToDate(data[key], format);
    else {
      if (/date/i.test(key) && isNaN(data[key]) && isValidDate(data[key], format)) {
        newData[key] = data[key] ? new Date(data[key]) : undefined;
      } else {
        newData[key] = data[key];
      }

      console.log('objStrDateToDate', key, newData[key], isNaN(data[key]));
    }
  });

  return newData;
};

export const objDateToStrDate = (data: any, format = 'YYYY-MM-DDTHH:mm:ssZ') => {
  const newData: any = Array.isArray(data) ? [] : {};

  Object.keys(data).forEach((key) => {
    if (data[key] === Object(data[key])) {
      if (/date/i.test(key) && isValidDate(data[key], format)) {
        newData[key] = formatMomentDate(data[key], format);
      } else {
        newData[key] = objDateToStrDate(data[key], format);
      }
      // console.log('objDateToStrDate1', key, newData[key]);
    } else {
      newData[key] = data[key];

      //console.log('objDateToStrDate2', key, newData[key]);
    }
  });

  return newData;
};
