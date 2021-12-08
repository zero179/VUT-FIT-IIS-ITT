import {IRole} from "../../../models/Role";
import {IconButton, TableCell, Typography} from "@mui/material";
import {IconEdit, IconTrash} from "@tabler/icons";
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
            id: 'description',
            children: 'Popis'
        },
        {
            id: 'actions',
            children: 'Akce',
            align: "center",
            sortable: false
        },
    ]
}

const RolesTable = (
    {
        roles,
        onEdit,
        onDelete,
    }: {
        roles: IRole[]
        onEdit?: (id: string) => (event: SyntheticEvent) => void
        onDelete?: (id: string) => (event: SyntheticEvent) => void
    }
) => {
    return (
        <>
            <EnhancedTable
                tableHeadColumns={createTableHeadColumns()}
                entities={roles}
                body={role => (
                    <>
                        <TableCell>
                            <Typography variant="body1">{role.name}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body1">{role.description}</Typography>
                        </TableCell>
                        <TableCell align={"center"}>
                            <IconButton onClick={onEdit ? onEdit(role.id) : undefined}>
                                <IconEdit/>
                            </IconButton>
                            <IconButton onClick={onDelete ? onDelete(role.id) : undefined}>
                                <IconTrash/>
                            </IconButton>
                        </TableCell>
                    </>
                )}
            />
        </>
    )
}

export default RolesTable