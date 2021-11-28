import stringToColor from "./stringToColor";

const stringAvatar = (name: string | null | undefined) => ({
    sx: {
        fontSize: 16,
        fontWeight: 800,
        bgcolor: stringToColor(name),
    },
    children: name ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}` : '',
});

export default stringAvatar