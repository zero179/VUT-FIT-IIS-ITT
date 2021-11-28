import dayjs from "dayjs";

declare module 'dayjs' {
    interface Dayjs {
        fromNow(): string;
    }
}

const redeclaredDayJs = dayjs;

redeclaredDayJs.extend(require('dayjs/plugin/localizedFormat'))
redeclaredDayJs.extend(require('dayjs/plugin/relativeTime'))
redeclaredDayJs.locale(require('dayjs/locale/cs'))

export default redeclaredDayJs