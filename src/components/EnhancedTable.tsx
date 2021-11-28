import {Checkbox, CircularProgress, Table, TableBody, TableCell, TablePagination, TableRow} from "@mui/material";
import {ReactFragment, SyntheticEvent, useState} from "react";
import useRouterFilter from "../hooks/useRouterFilter";
import EnhancedTableHead, {TableHeadColumn} from "./EnhancedTableHead";
import Paging from "../../models/Paging";

const EnhancedTable = (
    {
        paging,
        tableHeadColumns,
        entities,
        body,
        enableCheckBox = false
    }: {
        paging?: Paging,
        tableHeadColumns: TableHeadColumn[]
        entities?: any[],
        body: (entity: any) => ReactFragment,
        enableCheckBox?: boolean
    }
) => {
    const {handleChangeOffset, handleChangeLimit} = useRouterFilter()
    const [selectedItems, setSelectedItems] = useState<string[]>()

    const handleCheckboxClick = (id: string) => (_: SyntheticEvent<HTMLInputElement>, checked: boolean) => {
        setSelectedItems(prevState => {
            if (checked) {
                return prevState ? [...prevState, id] : [id]
            } else {
                return prevState?.filter(v => v !== id)
            }
        })
    };

    const handleSelectAllClick = (event: SyntheticEvent<HTMLInputElement>) => {
        const checked = (event.target as any).checked;
        if (checked) {
            setSelectedItems(entities?.map(e => e.id) ?? [])
        } else {
            setSelectedItems([])
        }
    };

    return <>
        <Table>
            <EnhancedTableHead
                enableCheckBox={enableCheckBox}
                columns={tableHeadColumns}
                numSelected={selectedItems?.length}
                rowCount={entities?.length ?? 0}
                onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
                {entities?.map(entity => (
                    <TableRow
                        key={entity.id}
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    >
                        {enableCheckBox && <TableCell padding="checkbox">
                            <Checkbox
                                color="primary"
                                onChange={handleCheckboxClick(entity.id)}
                                checked={selectedItems?.includes(entity.id) ?? false}
                            />
                        </TableCell>}
                        {body(entity)}
                    </TableRow>
                )) ?? <TableRow>
                    <TableCell
                        align={"center"}
                        colSpan={enableCheckBox ? tableHeadColumns.length + 1 : tableHeadColumns.length}
                    >
                        <CircularProgress/>
                    </TableCell>
                </TableRow>}
            </TableBody>
        </Table>
        {paging && <TablePagination
            rowsPerPageOptions={[20, 50, 100]}
            component="div"
            count={paging.totalElements}
            rowsPerPage={paging.pageSize}
            page={paging.pageNumber}
            onPageChange={handleChangeOffset}
            onRowsPerPageChange={handleChangeLimit}
        />}
    </>
}

export default EnhancedTable