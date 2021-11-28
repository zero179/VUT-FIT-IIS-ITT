import {Box, Grid, MenuItem, Select, TextField, Typography} from "@mui/material";
import React, {useCallback} from "react";
import {Controller, useFormContext} from "react-hook-form";
import {getObjectValueByPath} from "../../utils/getObjectValueByPath";

const PersonForm = (
    {
        path,
    }: {
        path: string,
    }) => {
    const createPath = useCallback((...args) => {
        const pathPrefix = path ? path + `.` : ``
        return pathPrefix + args.join('.')
    }, [path])

    const {control, setValue, getValues, formState: {errors}} = useFormContext();

    return <>
        <Grid container spacing={2}>
            <Grid item sm={12} md={6}>
                <Box py={1}>
                    <Controller
                        name={`${createPath('firstName')}`}
                        control={control}
                        defaultValue=""
                        render={() => (
                            <TextField
                                fullWidth
                                size="small"
                                label="Krstné meno"
                                value={getValues(`${createPath('firstName')}`)}
                                onChange={(e) =>
                                    setValue(`${createPath('firstName')}`, e.target.value)}
                                onBlur={(e) =>
                                    setValue(`${createPath('firstName')}`, e.target.value, {shouldValidate: true})
                                }
                                error={Boolean(getObjectValueByPath(errors, `${createPath('firstName')}`))}
                                helperText={getObjectValueByPath(errors, `${createPath('firstName')}`)?.message}
                            />
                        )}
                    />
                </Box>
            </Grid>
            <Grid item sm={12} md={6}>
                <Box py={1}>
                    <Controller
                        name={`${createPath('lastName')}`}
                        control={control}
                        defaultValue=""
                        render={() => (
                            <TextField
                                fullWidth
                                size="small"
                                label="Priezvisko"
                                value={getValues(`${createPath('lastName')}`)}
                                onChange={(e) =>
                                    setValue(`${createPath('lastName')}`, e.target.value)}
                                onBlur={(e) =>
                                    setValue(`${createPath('lastName')}`, e.target.value, {shouldValidate: true})
                                }
                                error={Boolean(getObjectValueByPath(errors, `${createPath('lastName')}`))}
                                helperText={getObjectValueByPath(errors, `${createPath('lastName')}`)?.message}
                            />
                        )}
                    />
                </Box>
            </Grid>
        </Grid>
        <Grid container spacing={2}>
            <Grid item sm={12} md={6}>
                <Box pt={1}>
                    <Typography variant="body1" width="100%">
                        Telefónne číslo
                    </Typography>
                </Box>
                <Box py={1} display="flex">
                    <Controller
                        name={`${createPath('phoneCountryPrefix')}`}
                        control={control}
                        defaultValue="+420"
                        render={() => (
                            <Select
                                fullWidth
                                size="small"
                                inputProps={{size: 'small'}}
                                value={getValues(`${createPath('phoneCountryPrefix')}`)}
                                onChange={(e) => setValue(`${createPath('phoneCountryPrefix')}`, e.target.value)}
                            >
                                <MenuItem value="+420">
                                    +420
                                </MenuItem>
                                <MenuItem value="+421">
                                    +421
                                </MenuItem>
                            </Select>
                        )}
                    />
                    &nbsp;
                    <Controller
                        name={`${createPath('phoneNumber')}`}
                        control={control}
                        defaultValue=""
                        render={() => (
                            <TextField
                                fullWidth
                                size="small"
                                label=""
                                value={getValues(`${createPath('phoneNumber')}`)}
                                onChange={(e) =>
                                    setValue(`${createPath('phoneNumber')}`, e.target.value)}
                                onBlur={(e) =>
                                    setValue(`${createPath('phoneNumber')}`, e.target.value, {shouldValidate: true})
                                }
                                error={Boolean(getObjectValueByPath(errors, `${createPath('phoneNumber')}`))}
                                helperText={getObjectValueByPath(errors, `${createPath('phoneNumber')}`)?.message}
                            />
                        )}
                    />
                </Box>
            </Grid>
        </Grid>
    </>
}

export default PersonForm