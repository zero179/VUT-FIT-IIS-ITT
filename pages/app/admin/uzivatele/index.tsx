import {NextPage} from "next";
import {Box, Grid, Paper, Typography, Button} from "@mui/material";
import MainLayout from "../../../../src/components/layout/MainLayout";
import {useQuery} from "@apollo/client";
import useRouterFilter from "../../../../src/hooks/useRouterFilter";
import UsersTable from "../../../../src/components/users/UsersTable";
import UserFormDialog from "../../../../src/components/users/UserFormDialog";
import {createContext, SyntheticEvent, useState} from "react";
import {usersGqlQuery} from "../../../../src/gql/queries/users";
import {withPageAuthRequired} from "@auth0/nextjs-auth0";
import {IconWriting} from '@tabler/icons'

export const UserModalIdContext = createContext<string | undefined>(undefined)

const AppAdminUsers: NextPage = () => {
    const {offset, limit} = useRouterFilter()

    const {data, refetch} = useQuery(usersGqlQuery, {
        variables: {
            offset,
            limit
        },
        fetchPolicy: 'no-cache'
    })

    const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false)
    const [openModalUserId, setOpenModalUserId] = useState<string>()

    const handleModalClose = async (_: SyntheticEvent, reason: string) => {
        setIsFormModalOpen(false)
        setOpenModalUserId(undefined)

        if (reason === 'success') {
            await refetch()
        }
    };

    const handleModalOpen = (userId?: string) => (_: SyntheticEvent) => {
        setIsFormModalOpen(true)
        setOpenModalUserId(userId)
    };

    return (
        <>
            <UserModalIdContext.Provider value={openModalUserId}>
                <MainLayout>
                    <Box justifyContent="center" display="flex" px={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md="auto" mt={2}>
                                <Typography
                                    variant="h2"
                                    display="flex"
                                    alignItems="center"
                                >
                                    User
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md="auto" mt={2} ml="auto" display="flex"
                                  alignItems="center">
                                <Button variant={"contained"} onClick={handleModalOpen()}>
                                    <IconWriting style={{marginRight: 10}}/> Vytvořit uživatele
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper sx={{overflowX: 'auto'}}>
                                    <UsersTable
                                        users={data?.getUsers.results}
                                        onEdit={handleModalOpen}
                                    />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                </MainLayout>
                {isFormModalOpen && <UserFormDialog
                    isOpen={isFormModalOpen}
                    handleClose={handleModalClose}
                />}
            </UserModalIdContext.Provider>
        </>
    )
}

export const getServerSideProps = withPageAuthRequired();

export default AppAdminUsers