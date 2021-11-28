import {
    Avatar,
    Fade,
    IconButton,
    Link,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Paper,
    Popper
} from "@mui/material";
import stringAvatar from "../utils/stringAvatar";
import {SyntheticEvent, useState} from "react";
import {IconLockAccess, IconLogout, IconUser} from "@tabler/icons";
import {useUser} from "@auth0/nextjs-auth0";

const UserMenu = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [open, setOpen] = useState(false);

    const {user} = useUser();

    const handleClick = (event: SyntheticEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => !prev);
    };

    return <>
        <IconButton onClick={handleClick}>
            <Avatar {...stringAvatar(user?.name)} />
        </IconButton>
        <Popper open={open} anchorEl={anchorEl} placement={'bottom-end'} transition>
            {({TransitionProps}) => (
                <Fade {...TransitionProps} timeout={350}>
                    <Paper>
                        <MenuList>
                            <MenuItem>
                                <ListItemIcon>
                                    <IconUser/>
                                </ListItemIcon>
                                <ListItemText>Osobní údaje</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <IconLockAccess/>
                                </ListItemIcon>
                                <ListItemText>Změnit heslo</ListItemText>
                            </MenuItem>
                            <MenuItem component={Link} href={'/api/auth/logout'}>
                                <ListItemIcon>
                                    <IconLogout/>
                                </ListItemIcon>
                                <ListItemText>Odhlásit se</ListItemText>
                            </MenuItem>
                        </MenuList>
                    </Paper>
                </Fade>
            )}
        </Popper>
    </>
}

export default UserMenu