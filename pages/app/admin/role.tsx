import {NextPage} from "next";
import {Box, Button, Grid, Paper, Typography} from "@mui/material";
import MainLayout from "../../../src/components/layout/MainLayout";
import {gql, useQuery} from "@apollo/client";
import useRouterFilter from "../../../src/hooks/useRouterFilter";
import RolesTable from "../../../src/components/roles/RolesTable";
import {IconWriting} from "@tabler/icons";
import RoleFormDialog from "../../../src/components/roles/RoleFormDialog";
import {createContext, SyntheticEvent, useState} from "react";
import {withPageAuthRequired} from "@auth0/nextjs-auth0";

const query = gql`
    query GetRoles($offset: Int!, $limit: Int!) {
        getRoles(offset: $offset, limit: $limit) {
            id
            name
            description
        }
    }
`

export const RoleModalIdContext = createContext<string | undefined>(undefined)

const AppAdminRoles: NextPage = () => {
    const {offset, limit} = useRouterFilter()

    const {data, refetch} = useQuery(query, {
        variables: {
            offset,
            limit
        },
        fetchPolicy: 'no-cache'
    })

    const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false)
    const [openModalRoleId, setOpenModalRoleId] = useState<string>()

    const handleModalClose = async (_: SyntheticEvent, reason: string) => {
        setIsFormModalOpen(false)
        setOpenModalRoleId(undefined)

        if (reason === 'success') {
            await refetch()
        }
    };

    const handleModalOpen = (roleId?: string) => (_: SyntheticEvent) => {
        setIsFormModalOpen(true)
        setOpenModalRoleId(roleId)
    };

    return (
        <>
            <RoleModalIdContext.Provider value={openModalRoleId}>
                <MainLayout>
                    <Box justifyContent="center" display="flex" px={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md="auto" mt={2}>
                                <Typography
                                    variant="h2"
                                    display="flex"
                                    alignItems="center"
                                >
                                    Role
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md="auto" mt={2} ml="auto" display="flex"
                                  alignItems="center">
                                <Button variant={"contained"} onClick={handleModalOpen()}>
                                    <IconWriting style={{marginRight: 10}}/> Vytvořit roli
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper sx={{overflowX: 'auto'}}>
                                    <RolesTable
                                        roles={data?.getRoles}
                                        onEdit={handleModalOpen}
                                    />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                </MainLayout>
                {isFormModalOpen && <RoleFormDialog
                    isOpen={isFormModalOpen}
                    handleClose={handleModalClose}
                />}
            </RoleModalIdContext.Provider>
        </>
    )
}

export const getServerSideProps = withPageAuthRequired();

export default AppAdminRoles