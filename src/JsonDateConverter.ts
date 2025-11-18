import { JsonConverter, type JsonCustomConvert } from 'json2typescript';
import { DateTime } from 'luxon';

@JsonConverter
export class DateConverter implements JsonCustomConvert<DateTime> {
  serialize(date: DateTime): string | null {
    return date.toSQLDate();
  }

  deserialize(date: string): DateTime {
    return DateTime.fromSQL(date);
  }
}

@JsonConverter
export class DateTimeConverter extends DateConverter {
  serialize(date: DateTime): string | null {
    const dt = date.toSQL({
      includeOffset: false,
      includeOffsetSpace: false,
      includeZone: false,
    });

    if (dt) {
      return dt.split('.')[0];
    }

    return dt;
  }
}
