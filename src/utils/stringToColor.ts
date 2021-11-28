const stringToColor = (string: string | null | undefined) => {
    let hash = 0;
    let i;

    if (!string) {
        return 'rgba(158,188,51,1)'
    }

    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 6)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }

    return color;
};

export default stringToColor