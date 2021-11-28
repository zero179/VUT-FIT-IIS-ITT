import {Box, SwipeableDrawer} from "@mui/material";
import {useContext} from "react";
import Notch from "./Notch";
import {IMainLayoutContext, MainLayoutContext} from "./layout/MainLayout";

const MobileBottomDrawer = ({children}: { children: any }) => {
    const {isMobileDrawerOpen, setIsMobileDrawerOpen} = useContext<IMainLayoutContext>(MainLayoutContext)
    const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

    return (
        <SwipeableDrawer
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
            anchor="bottom"
            open={isMobileDrawerOpen}
            onClose={() => setIsMobileDrawerOpen(false)}
            onOpen={() => setIsMobileDrawerOpen(false)}
        >
            <Box px={2} pt={4} pb={3}>
                <Notch/>
                {children}
            </Box>
        </SwipeableDrawer>
    )
}

export default MobileBottomDrawer