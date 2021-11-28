import {Box, TextField, Typography} from "@mui/material";
import React, {useCallback} from "react";
import PersonForm from "../form-partials/PersonForm";
import {Controller, useFormContext} from "react-hook-form";

const UserForm = (
    {
        path = '',
        isCreate = false
    }: {
        path?: string
        isCreate?: boolean
    }
) => {
    const createPath = useCallback((...args) => {
        const pathPrefix = path ? path + `.` : ``
        return pathPrefix + args.join('.')
    }, [path])

    const {control, getValues, setValue, formState: {errors}} = useFormContext();

    return (
        <Box py={2}>
            <Typography mb={1} fontSize={12} fontWeight={800} sx={{textTransform: 'uppercase'}}>Účet</Typography>
            <Box py={1}>
                <Controller
                    name={`${createPath('account', 'email')}`}
                    control={control}
                    defaultValue=""
                    render={() => {
                        return (
                            <TextField
                                fullWidth
                                size="small"
                                label="Email"
                                value={getValues(`${createPath('account', 'email')}`)}
                                onChange={(e) =>
                                    setValue(`${createPath('account', 'email')}`, e.target.value)}
                                onBlur={(e) =>
                                    setValue(`${createPath('account', 'email')}`, e.target.value, {shouldValidate: true})
                                }
                                error={Boolean(errors?.account?.email)}
                                helperText={errors?.account?.email?.message}
                            />
                        )
                    }
                    }
                />
            </Box>

            {isCreate && <Box py={1}>
                <Controller
                    name={`${createPath('account', 'password')}`}
                    control={control}
                    defaultValue=""
                    render={() => {
                        return (
                            <TextField
                                fullWidth
                                size="small"
                                label="Heslo"
                                value={getValues(`${createPath('account', 'password')}`)}
                                onChange={(e) =>
                                    setValue(`${createPath('account', 'password')}`, e.target.value)}
                                onBlur={(e) =>
                                    setValue(`${createPath('account', 'password')}`, e.target.value, {shouldValidate: true})
                                }
                                error={Boolean(errors?.account?.password)}
                                helperText={errors?.account?.password?.message}
                            />
                        )
                    }
                    }
                />
            </Box>}

            <Typography
                mt={4}
                mb={1}
                fontSize={12}
                fontWeight={800}
                sx={{textTransform: 'uppercase'}}
            >
                Osobní údaje
            </Typography>

            <PersonForm path={`${createPath('person')}`}/>
        </Box>
    )
}

export default UserForm
