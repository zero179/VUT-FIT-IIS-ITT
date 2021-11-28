export const replaceEmpty = (someObj: any, replaceValue = undefined) => {
    const replacer = (key: string, value: any) => String(value) === '' ? replaceValue : value;
    return JSON.parse(JSON.stringify(someObj, replacer));
};