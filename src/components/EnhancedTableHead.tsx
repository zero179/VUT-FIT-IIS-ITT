import {Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel, Theme} from "@mui/material";
import {SxProps} from "@mui/system";
import {v4 as uuid} from 'uuid'
import {SyntheticEvent} from "react";
import useRouterFilter from "../hooks/useRouterFilter";
import {visuallyHidden} from "@mui/utils";

export enum Order {
    ASC = 'asc',
    DESC = 'desc'
}

export interface TableHeadColumn {
    id: string
    children: Node | string
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
    sx?: SxProps<Theme>
    sortable?: boolean
}

const EnhancedTableHead = (
    {
        columns,
        enableCheckBox = false,
        numSelected = 0,
        rowCount = 0,
        onSelectAllClick,
    }: {
        columns: TableHeadColumn[]
        enableCheckBox?: boolean
        numSelected?: number
        rowCount?: number
        onRequestSort?: (event: SyntheticEvent<unknown>, property: string) => void
        onSelectAllClick?: (event: SyntheticEvent<HTMLInputElement>) => void
    }
) => {
    const {handleChangeSort, order, orderBy} = useRouterFilter()

    const createSortHandler =
        (property: string, order: Order) => (_: SyntheticEvent<unknown>) => {
            onRequestSort(property, order);
        };

    const onRequestSort = (property: string, order: Order) => {
        handleChangeSort(property, order)
    }

    return <TableHead>
        <TableRow>
            {enableCheckBox && <TableCell padding="checkbox">
                <Checkbox
                    color="primary"
                    indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={rowCount > 0 && numSelected === rowCount}
                    onChange={onSelectAllClick}
                    inputProps={{
                        'aria-label': 'vybrat všechny',
                    }}
                />
            </TableCell>}
            {columns.map(column =>
                <TableCell
                    key={uuid()}
                    sx={{
                        fontWeight: 800,
                        ...column.sx
                    }}
                    align={column.align ?? 'inherit'}
                    sortDirection={orderBy === column.id ? order : false}
                >
                    {column.sortable === false
                        ? column.children
                        : <TableSortLabel
                            active={orderBy === column.id}
                            direction={orderBy === column.id ? order : Order.ASC}
                            onClick={createSortHandler(column.id, order === Order.ASC ? Order.DESC : Order.ASC)}
                        >
                            {column.children}
                            {orderBy === column.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === Order.DESC ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    }
                </TableCell>
            )}
        </TableRow>
    </TableHead>
}

export default EnhancedTableHead