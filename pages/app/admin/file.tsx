import {NextPage} from "next";
import {Box, Button, Grid, Paper, Typography} from "@mui/material";
import MainLayout from "../../../src/components/layout/MainLayout";
import {gql, useQuery} from "@apollo/client";
import useRouterFilter from "../../../src/hooks/useRouterFilter";
import RolesTable from "../../../src/components/files/FileTable";
import {IconFiles, IconWriting} from "@tabler/icons";
import RoleFormDialog from "../../../src/components/roles/RoleFormDialog";
import {ChangeEvent, Component, createContext, SyntheticEvent, useState} from "react";
import {withPageAuthRequired} from "@auth0/nextjs-auth0";
import React from "react";

const query = gql`
    query GetRoles($offset: Int!, $limit: Int!) {
        getRoles(offset: $offset, limit: $limit) {
            id
            name
            description
        }
    }
`
interface UploadFileOwnProps { }
interface UploadFileProps extends UploadFileOwnProps { }

// component State
interface UploadFileStateProps { }

//export const RoleModalIdContext = createContext<string | undefined>(undefined)

const AppAdminFiles: NextPage = () => {
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

    const [fileSelected, setFileSelected] = React.useState<File>() // also tried <string | Blob>

const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;

    if (!fileList) return;
    
    setFileSelected(fileList[0]);
  };

  const uploadFile = function () {
    if (fileSelected) {
        const formData = new FormData();
        formData.append("image", fileSelected, fileSelected.name);
        console.log(`The file name is ${fileSelected.name}`);
    }
};

    return (
        <>
                <MainLayout>
                    <Box justifyContent="center" display="flex" px={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md="auto" mt={2}>
                                <Typography
                                    variant="h2"
                                    display="flex"
                                    alignItems="center"
                                >
                                    Soubory
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md="auto" mt={2} ml="auto" display="flex">
                            <input accept="image/*,.pdf,.doc,.docx,.xls,.xlsx" style={{ display: "none" }} id="file" multiple={true} type="file"
                                onChange={handleImageChange} />
                            <label htmlFor="file">
                                <Button component="span" onClick={uploadFile}>
                                <IconWriting style={{marginRight: 10}}/> Vložit Soubory
                                </Button>
                            </label>
                        </Grid>
                            <Grid item xs={12}>
                                <Paper sx={{overflowX: 'auto'}}>
                                    <RolesTable
                                        files={data?.getRoles}
                                        onEdit={handleModalOpen}
                                    />
                                </Paper>
                            </Grid>
                        </Grid>
                        </Box>
                </MainLayout>
        </>
    )
}

export const getServerSideProps = withPageAuthRequired();

export default AppAdminFiles