import {Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {useContext, useEffect} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {UserModalIdContext} from "../../../pages/app/admin/uzivatele";
import UserForm from "./UserForm";
import {replaceNull} from "../../utils/replaceNull";
import {userGqlMutation} from "../../gql/mutations/user";
import {userGqlQuery} from "../../gql/queries/user";
import {FormProvider, useForm} from "react-hook-form";
import {replaceEmpty} from "../../utils/replaceEmpty";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import {accountValidationSchema} from "../form-partials/validationSchemas/accountValidationSchema";
import {personValidationSchema} from "../form-partials/validationSchemas/personValidationSchema";
import {IUser} from "../../../models/User";
import {IUserInput} from "../../../models/UserInput";
import {createUserGqlMutation} from "../../gql/mutations/createUser";

export interface IUserForm extends IUserInput {

}

const mapUserToForm = (user?: IUser): Partial<IUserForm> => {
    const replacedUser: IUser | undefined = user ? replaceNull(user) : undefined

    return {
        account: {
            email: replacedUser?.account.email ?? '',
        },
        person: {
            firstName: replacedUser?.person?.firstName ?? '',
            lastName: replacedUser?.person?.lastName ?? '',
            phoneCountryPrefix: replacedUser?.person?.phoneCountryPrefix ?? '',
            phoneNumber: replacedUser?.person?.phoneNumber ?? '',
        },
    }
};

const schema = yup.object({
    account: accountValidationSchema,
    person: personValidationSchema,
}).required();

const UserFormDialog = (
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
    const contextId = useContext(UserModalIdContext)
    const {data} = useQuery(userGqlQuery, {
        variables: {
            id: contextId
        },
        skip: !contextId,
        fetchPolicy: 'no-cache',
    })

    const methods = useForm({
        defaultValues: mapUserToForm(),
        resolver: yupResolver(schema),
        mode: "onChange",
    })

    const onSubmit = (data: IUserForm) => {
        contextId
            ? updateUser({variables: {id: contextId, input: replaceEmpty(data)}})
            : createUser({variables: {input: replaceEmpty(data)}})

        handleClose({}, "success")
    };

    useEffect(() => {
        if (data?.getUser) {
            methods.setValue("person", mapUserToForm(data?.getUser).person, {shouldValidate: true})
            methods.setValue('account', mapUserToForm(data?.getUser).account, {shouldValidate: true})
        }
    }, [data])

    const [updateUser] = useMutation(userGqlMutation)
    const [createUser] = useMutation(createUserGqlMutation)

    return (
        <>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                fullWidth
                maxWidth="md"
            >
                <FormProvider {...methods} >
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <DialogTitle>{contextId ? 'Upravit uživatele' : 'Vytvořit uživatele'}</DialogTitle>
                        <DialogContent>
                            {(!contextId || (contextId && data)) && <UserForm isCreate={!contextId}/>}
                            {contextId && !data &&
                            <Box display="flex" justifyContent="center" py={8}><CircularProgress/></Box>}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={e => handleClose(e, 'cancel')}>Zrušiť</Button>
                            <Button type="submit">Uložit</Button>
                        </DialogActions>
                    </form>
                </FormProvider>
            </Dialog>
        </>
    )
}

export default UserFormDialog