import {IFile} from "../../../models/FIle";
import {IconButton, TableCell, Typography} from "@mui/material";
import {IconEdit, IconTrash} from "@tabler/icons";
import EnhancedTable from "../EnhancedTable";
import {TableHeadColumn} from "../EnhancedTableHead";
import {SyntheticEvent} from "react";

const createTableHeadColumns = (): TableHeadColumn[] => {
    return [
        {
            id: 'name',
            children: 'E-mail'
        },
        {
            id: 'file',
            children: 'Název souboru'
        },
        {
            id: 'actions',
            children: 'Akce',
            align: "center",
            sortable: false
        },
    ]
}

const FileTable = (
    {
        files,
        onEdit,
        onDelete,
    }: {
        files: IFile[]
        onEdit?: (id: string) => (event: SyntheticEvent) => void
        onDelete?: (id: string) => (event: SyntheticEvent) => void
    }
) => {
    return (
        <>
            <EnhancedTable
                tableHeadColumns={createTableHeadColumns()}
                entities={files}
                body={file => (
                    <>
                        <TableCell>
                            <Typography variant="body1">{file.name}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body1">{file.description}</Typography>
                        </TableCell>
                        <TableCell align={"center"}>
                            <IconButton onClick={onEdit ? onEdit(file.id) : undefined}>
                                <IconEdit/>
                            </IconButton>
                            <IconButton onClick={onDelete ? onDelete(file.id) : undefined}>
                                <IconTrash/>
                            </IconButton>
                        </TableCell>
                    </>
                )}
            />
        </>
    )
}

export default FileTable