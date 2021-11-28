import {AppBar, Box, Hidden, Link, Toolbar} from "@mui/material";
import {useContext} from "react";
import {IMainLayoutContext, MainLayoutContext} from "./MainLayout";
import MenuButton from "./MenuButton";
import Image from "next/image";
import UserMenu from "../UserMenu";

const Header = () => {
    const {drawerWidth} = useContext<IMainLayoutContext>(MainLayoutContext)

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar
                color="transparent"
                position="static"
                sx={{
                    width: {
                        sm: `calc(100% - ${drawerWidth}px)`,
                        xs: '100%'
                    },
                    ml: {
                        sm: `${drawerWidth}px`,
                        xs: 0
                    }
                }}
            >
                <Toolbar>
                    <Hidden smUp>
                        <Link href={"/app/nastenka"}>
                            <Box
                                display={'flex'}
                                alignItems={"center"}
                                ml={{
                                    xs: 0,
                                    sm: 2
                                }}
                            >
                                <Image
                                    width={147}
                                    height={40}
                                    src="/images/logo.svg"
                                />
                            </Box>
                        </Link>
                        <Box ml={'auto'}>
                            <Box display="inline" mr={1}>
                                <UserMenu/>
                            </Box>
                            <MenuButton/>
                        </Box>
                    </Hidden>
                    <Hidden smDown>
                        <Box ml={'auto'}>
                            <UserMenu/>
                        </Box>
                    </Hidden>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header