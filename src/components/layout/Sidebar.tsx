import {Box, Divider, Drawer, Toolbar, Link} from "@mui/material";
import {useContext, useState} from "react";
import {COLLAPSED_DRAWER_WIDTH, EXPANDED_DRAWER_WIDTH, IMainLayoutContext, MainLayoutContext} from "./MainLayout";
import MenuButton from "./MenuButton";
import Menu from "./Menu";
import Image from "next/image";

const Sidebar = () => {
    const {drawerWidth, setDrawerWidth} = useContext<IMainLayoutContext>(MainLayoutContext)
    const [isOstensiblyExpanded, setIsOstensiblyExpanded] = useState(false)

    const showIfCollapsed = () => {
        if (drawerWidth === COLLAPSED_DRAWER_WIDTH && !isOstensiblyExpanded) {
            setIsOstensiblyExpanded(true)
            setDrawerWidth(EXPANDED_DRAWER_WIDTH)
        }
    }

    const hideIfOstensiblyExpanded = () => {
        if (drawerWidth === EXPANDED_DRAWER_WIDTH && isOstensiblyExpanded) {
            setIsOstensiblyExpanded(false)
            setDrawerWidth(COLLAPSED_DRAWER_WIDTH)
        }
    }

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="persistent"
            anchor="left"
            open={true}
        >
            <Toolbar>
                <MenuButton/>
                <Link href={"/app/nastenka"}>
                    <Box
                        display={'flex'}
                        alignItems={"center"}
                        ml={2}
                    >
                        <Image
                            width={147}
                            height={40}
                            src="/images/logo.svg"
                        />
                    </Box>
                </Link>
            </Toolbar>
            <Divider/>
            <Box
                mt={4}
                pr={1}
                overflow="hidden scroll"
                onMouseEnter={() => showIfCollapsed()}
                onMouseLeave={() => hideIfOstensiblyExpanded()}
            >
                <Menu/>
            </Box>
        </Drawer>
    )
}

export default Sidebar