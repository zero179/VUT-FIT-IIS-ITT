import {TableCell, Typography} from "@mui/material";
import {TableHeadColumn} from "../../EnhancedTableHead";
import UserLog from "../../../../models/UserLog";
import EnhancedTable from "../../EnhancedTable";
import dayjs from "../../../config/dayjs"
import {useCallback} from "react";
import Paging from "../../../../models/Paging";

const createTableHeadColumns = (): TableHeadColumn[] => {
    return [
        {
            id: 'event',
            children: 'Událost',
            sortable: false
        },
        {
            id: 'when',
            children: 'Datum a čas',
            sortable: false
        },
        {
            id: 'from',
            children: 'Poloha',
            sortable: false
        }
    ]
}

enum TypeDictionary {
    s = 'Přihlášení proběhlo úspěšně',
    seacft = 'Úspěšná výměna autorizačního tokenu za přístupový token',
    fp = 'Nesprávné heslo',
    slo = 'Odhlášení proběhlo úspěšně',
    scp = 'Změna hesla proběhla úspěšně',
    ss = 'Registrace proběhla úspěšně'
}

const UserLogsTable = (
    {
        logs,
        paging,
    }: {
        logs: UserLog[]
        paging?: Paging
    }
) => {

    const i18nType = useCallback((type: string) => {
        if (Object.keys(TypeDictionary).includes(type)) {
            // @ts-ignore
            return TypeDictionary[type as any]
        } else {
            return `Neznámy kód: ${type}`
        }
    }, [])

    return (
        <>
            <EnhancedTable
                tableHeadColumns={createTableHeadColumns()}
                entities={logs}
                paging={paging}
                body={(log: UserLog) => (
                    <>
                        <TableCell>
                            <Typography variant="body1">
                                {i18nType(log.type)}
                            </Typography>
                            <Typography variant="caption">
                                {log.description}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body1">
                                {dayjs(log.date).fromNow()}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body1" sx={{display: 'inline'}}>
                                IP:
                            </Typography>
                            <Typography variant="code" sx={{ml: 1}}>
                                {log.fromIp}
                            </Typography>
                            <Typography variant="body1">
                                {log.fromLocation}
                            </Typography>
                        </TableCell>
                    </>
                )}
            />
        </>
    )
}

export default UserLogsTable