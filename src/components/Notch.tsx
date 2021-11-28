import {Box} from "@mui/material";
import {grey} from "@mui/material/colors";

const Notch = () => {
    return <Box
        sx={{
            width: '36%',
            height: 6,
            backgroundColor: grey[300],
            borderRadius: 10,
            position: 'absolute',
            top: 12,
            left: '32%',
        }}
    />
}

export default Notch