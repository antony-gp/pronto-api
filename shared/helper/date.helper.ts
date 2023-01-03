export class DateHelper {
  static stringify(date: Date): string {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().replace(/T|Z/g, ' ').trim();
  }

  static parse(dateString: string, timeString?: string): Date | false {
    const [, date, year, month, day, time, hours, minutes, seconds, milliseconds] =
      dateString.match(
        /^((\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))(\s([01]\d|2[0-3]):([0-5]\d):([0-5]\d)\.(\d{3}))?$/,
      ) || [];

    const datetime = new Date(`${date} ${time || timeString}`);

    return (
      +year === datetime?.getFullYear() &&
      +month - 1 === datetime?.getMonth() &&
      +day === datetime?.getDate() &&
      ((!time && timeString) ||
        (+hours === datetime?.getHours() &&
          +minutes === datetime?.getMinutes() &&
          +seconds === datetime?.getSeconds() &&
          +milliseconds === datetime?.getMilliseconds())) &&
      datetime
    );
  }
}
