import {IconButton, useMediaQuery} from "@mui/material";
import {useContext} from "react";
import {COLLAPSED_DRAWER_WIDTH, EXPANDED_DRAWER_WIDTH, IMainLayoutContext, MainLayoutContext} from "./MainLayout";
import {IconMenu2} from "@tabler/icons";
import {theme} from "../../config/theme";

const MenuButton = () => {
    const {
        drawerWidth,
        setDrawerWidth,
        isMobileDrawerOpen,
        setIsMobileDrawerOpen
    } = useContext<IMainLayoutContext>(MainLayoutContext)
    const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));

    const handleOnClick = () => {
        if (isSmDown) {
            setIsMobileDrawerOpen(!isMobileDrawerOpen)
        } else {
            setDrawerWidth(drawerWidth === EXPANDED_DRAWER_WIDTH ? COLLAPSED_DRAWER_WIDTH : EXPANDED_DRAWER_WIDTH)
        }
    }

    return (
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => handleOnClick()}
        >
            <IconMenu2/>
        </IconButton>
    )
}

export default MenuButton