import {Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {SyntheticEvent, useContext} from "react";
import {RoleModalIdContext} from "../../../pages/app/admin/role";
import {gql, useQuery} from "@apollo/client";
import {IRole} from "../../../models/Role";

const query = gql`
    query GetRole($id: String!) {
        getRole(id: $id) {
            id
            name
            description
        }
    }
`

const RoleFormDialog = (
    {
        isOpen = true,
        handleClose
    }: {
        isOpen: boolean
        handleClose: {
            bivarianceHack(event: {}, reason: 'backdropClick' | 'escapeKeyDown' | 'cancel' | 'success'): void;
        }['bivarianceHack']
    }
) => {
    const contextId = useContext(RoleModalIdContext)

    const {data} = useQuery(query, {
        variables: {
            id: contextId
        },
        skip: !contextId,
        fetchPolicy: 'no-cache',
    })

    const createRoleContent = () => {
        const role: IRole = data?.getRole;

        return <>
            {/*  TODO: This is gonna be a form, which has to be done by @jhwebgang  */}
        </>
    }

    const save = (e: SyntheticEvent<HTMLAnchorElement | HTMLButtonElement>) => {
        handleClose(e, 'success')
    };

    return (
        <>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle>{contextId ? 'Upravit roli' : 'Vytvořit roli'}</DialogTitle>
                <DialogContent>
                    {contextId ? (
                        data
                            ? createRoleContent()
                            : <Box display="flex" justifyContent="center" py={8}><CircularProgress/></Box>
                    ) : createRoleContent()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={e => handleClose(e, 'cancel')}>Zrušit</Button>
                    <Button onClick={e => save(e)}>Uložit</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default RoleFormDialog