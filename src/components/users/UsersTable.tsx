import User from "../../../models/User";
import {IconButton, TableCell, Typography, Link} from "@mui/material";
import {IconEdit, IconHistory, IconTrash} from "@tabler/icons";
import EnhancedTable from "../EnhancedTable";
import {TableHeadColumn} from "../EnhancedTableHead";
import {SyntheticEvent} from "react";

const createTableHeadColumns = (): TableHeadColumn[] => {
    return [
        {
            id: 'name',
            children: 'Jméno'
        },
        {
            id: 'email',
            children: 'Email'
        },
        {
            id: 'phone',
            children: 'Mobil'
        },
        {
            id: 'actions',
            children: 'Akce',
            align: "center",
            sortable: false
        },
    ]
}

const UsersTable = (
    {
        users,
        onEdit,
        onDelete,
    }: {
        users: User[]
        onEdit?: (id: string) => (event: SyntheticEvent) => void
        onDelete?: (id: string) => (event: SyntheticEvent) => void
    }
) => {
    return (
        <>
            <EnhancedTable
                enableCheckBox
                tableHeadColumns={createTableHeadColumns()}
                entities={users}
                body={user => (
                    <>
                        <TableCell>
                            {user.business
                                ? <>
                                    <Typography variant="body1">
                                        {user.business.name}
                                    </Typography>
                                    <Typography variant="body1">
                                        {`${user.business.person.firstName} ${user.business.person.lastName}`}
                                    </Typography>
                                </>
                                : <>
                                    <Typography variant="body1">
                                        {`${user.person!.firstName} ${user.person!.lastName}`}
                                    </Typography>
                                </>
                            }
                        </TableCell>
                        <TableCell>
                            <Typography variant="body1">
                                {user.account.email}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            {user.business
                                ? <>
                                    <Typography variant="body1">
                                        {`${user.business.person.phoneCountryPrefix}${user.business.person.phoneNumber}`}
                                    </Typography>
                                </>
                                : <>
                                    <Typography variant="body1">
                                        {`${user.person!.phoneCountryPrefix}${user.person!.phoneNumber}`}
                                    </Typography>
                                </>
                            }
                        </TableCell>
                        <TableCell align={"center"}>
                            <IconButton onClick={onEdit ? onEdit(user.id) : undefined}>
                                <IconEdit/>
                            </IconButton>
                            <Link href={`/app/admin/uzivatele/${user.id}/historie`}>
                                <IconButton>
                                    <IconHistory/>
                                </IconButton>
                            </Link>
                            <IconButton>
                                <IconTrash/>
                            </IconButton>
                        </TableCell>
                    </>
                )}
            />
        </>
    )
}

export default UsersTable