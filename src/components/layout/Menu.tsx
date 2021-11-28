import {TreeItem, TreeView} from "@mui/lab";
import {SyntheticEvent, useContext, useEffect, useMemo, useState} from "react";
import {EXPANDED_DRAWER_WIDTH, IMainLayoutContext, MainLayoutContext} from "./MainLayout";
import {Box, Typography} from "@mui/material";
import {IconCertificate, IconChevronDown, IconChevronUp, IconDashboard, IconMan, IconUsers} from "@tabler/icons";
import {useRouter} from "next/router";

const TreeItemLabel = ({icon, labelText, endIcon}: { icon?: any, labelText: string, endIcon?: any }) => {
    const {drawerWidth} = useContext<IMainLayoutContext>(MainLayoutContext)

    return <Box
        display={'flex'}
        alignItems={"center"}
        py={1}
    >
        {icon}
        {drawerWidth == EXPANDED_DRAWER_WIDTH && (
            <>
                <Typography pl={2} fontSize={16} lineHeight={2} display="inline"
                            fontWeight="inherit">
                    {labelText}
                </Typography>
                <Box ml="auto"
                     display="flex"
                     alignItems="center"
                     pr={1}
                >
                    {endIcon}
                </Box>
            </>
        )
        }
    </Box>
}

const Menu = () => {
    const router = useRouter()

    const {drawerWidth, setIsMobileDrawerOpen} = useContext<IMainLayoutContext>(MainLayoutContext)

    const [expanded, setExpanded] = useState<string[]>([]);

    const handleOnToggle = async (_: SyntheticEvent, nodeIds: string[]) => setExpanded(nodeIds === [] ? [] : nodeIds)

    const handleOnClick = async (_: SyntheticEvent, nodeIds: string) => {
        if (nodeIds.startsWith('link:/')) {
            const url = nodeIds.replace('link:/', '')
            await router.push(`/app/${url}`)
            setIsMobileDrawerOpen(false)
        }
    }

    const selectedNodeIds = useMemo(() => router.asPath.replace('/app/', 'link:/'), [router.query])

    useEffect(() => {
        setExpanded([router.asPath.split('/')[2]])
    }, [router.query])

    return (
        <TreeView
            selected={selectedNodeIds}
            expanded={expanded}
            onNodeSelect={handleOnClick}
            onNodeToggle={handleOnToggle}
            aria-label="file system navigator"
            sx={{
                ml: -1,
                flexGrow: 1,
                maxWidth: drawerWidth,
                overflowY: 'auto'
            }}
        >
            <TreeItem nodeId="link:/nastenka"
                      label={<TreeItemLabel icon={<IconDashboard stroke={1.5}/>} labelText="Nástenka"/>}/>
            <TreeItem
                nodeId="admin"
                label={
                    <TreeItemLabel
                        icon={<IconMan stroke={1.5}/>}
                        endIcon={expanded[0] === '1' ? <IconChevronUp stroke={1.5}/> :
                            <IconChevronDown stroke={1.5}/>}
                        labelText="Administrace"
                    />
                }>
                {drawerWidth == EXPANDED_DRAWER_WIDTH && <>
                    <TreeItem nodeId="link:/admin/role"
                              label={<TreeItemLabel icon={<IconCertificate stroke={1.5}/>} labelText="Role"/>}/>
                    <TreeItem nodeId="link:/admin/uzivatele"
                              label={<TreeItemLabel icon={<IconUsers stroke={1.5}/>} labelText="Uživatelé"/>}/>
                </>}
            </TreeItem>
        </TreeView>
    )
}

export default Menu