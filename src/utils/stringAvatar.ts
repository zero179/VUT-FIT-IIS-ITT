import stringToColor from "./stringToColor";

function createAbr(name: string | null | undefined){
    if (typeof name === "undefined" || name === null){
        return "UN"
    }
    if (name.includes(' ')) {
        return `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
    }
    return `${name.split(' ')[0][0]}${name.split(' ')[0][1]}`
};

const stringAvatar = (name: string | null | undefined) => ({
    sx: {
        fontSize: 16,
        fontWeight: 800,
        bgcolor: stringToColor(name),
    },
    children: createAbr(name),
});

export default stringAvatar