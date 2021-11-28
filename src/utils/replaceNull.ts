export const replaceNull = (someObj: any, replaceValue = '') => {
    const replacer = (key: string, value: any) => String(value) === "null" ? replaceValue : value;
    return JSON.parse(JSON.stringify(someObj, replacer));
};