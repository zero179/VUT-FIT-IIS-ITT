import {Box, Hidden} from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";
import {createContext, useState} from "react";
import MobileBottomDrawer from "../MobileBottomDrawer";
import Menu from "./Menu";

export const EXPANDED_DRAWER_WIDTH = 300;
export const COLLAPSED_DRAWER_WIDTH = 70;
export const HEADER_HEIGHT = 65;

export interface IMainLayoutContext {
    drawerWidth: number
    setDrawerWidth: (value: number) => void
    isMobileDrawerOpen: boolean
    setIsMobileDrawerOpen: (value: boolean) => void
}

export const MainLayoutContext = createContext<IMainLayoutContext>({
    drawerWidth: EXPANDED_DRAWER_WIDTH,
    setDrawerWidth: () => null,
    isMobileDrawerOpen: false,
    setIsMobileDrawerOpen: () => null
})

const MainLayout = ({children}: { children: any }) => {
    const [drawerWidth, setDrawerWidth] = useState<number>(EXPANDED_DRAWER_WIDTH)
    const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false)
    const context = {drawerWidth, setDrawerWidth, isMobileDrawerOpen, setIsMobileDrawerOpen}

    return (
        <MainLayoutContext.Provider value={context}>
            <Header/>
            <Hidden smDown>
                <Sidebar/>
            </Hidden>
            <Hidden smUp>
                <MobileBottomDrawer>
                    <Menu/>
                </MobileBottomDrawer>
            </Hidden>
            <Box
                sx={{
                    width: {
                        sm: `calc(100% - ${drawerWidth}px)`,
                        xs: '100%'
                    },
                    height: {
                        sm: `calc(100vh - ${HEADER_HEIGHT}px)`,
                        xs: '100%'
                    },
                    overflow: 'hidden scroll',
                    ml: {
                        sm: `${drawerWidth}px`,
                        xs: 0
                    },
                    py: 2,
                    background: 'rgb(245,245,245)'
                }}
            >
                <Box mx={1}>{children}</Box>
            </Box>
        </MainLayoutContext.Provider>
    )
}

export default MainLayout