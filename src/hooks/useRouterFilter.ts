import {useRouter} from "next/router";
import {ChangeEventHandler, SyntheticEvent} from "react";
import {Order} from "../components/EnhancedTableHead";

const useRouterFilter = () => {
    const router = useRouter()

    const limit = +(router.query['limit'] ?? 20)
    const offset = +(router.query['offset'] ?? 0)
    const orderBy = router.query['sort'] ? router.query['sort'][0] : null;
    const order = router.query['sort'] ? router.query['sort'][1] : null;

    let {limit: _, offset: __, ...filters} = router.query

    const handleFilterChange = async (filterName: string, filterValue: any) => {
        await router.push({
            query: {
                ...router.query,
                [filterName]: filterValue.toString()
            }
        })
    };

    const handleChangeSort = async (by: string, order: Order) => {
        await router.push({
            query: {
                ...router.query,
                sort: [by, order]
            }
        })
    };

    const handleChangeOffset = async (_: SyntheticEvent<HTMLButtonElement> | null, page: number) => {
        await router.push({
            query: {
                ...router.query,
                offset: (page * limit).toString()
            }
        })
    };

    const handleChangeLimit = async (e: SyntheticEvent<HTMLInputElement>) => {
        const {value} = e.target as any;
        await router.push({
            query: {
                ...router.query,
                limit: value
            }
        })
    };

    return <{
        offset: number
        limit: number
        filters: any
        order: Order
        orderBy: string
        handleFilterChange: (filterName: string, filterValue: any) => void
        handleChangeSort: (orderBy: string, order: any) => void
        handleChangeOffset: (e_: SyntheticEvent<HTMLButtonElement> | null, page: number) => void
        handleChangeLimit: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    }>{
        offset,
        limit,
        filters,
        order,
        orderBy,
        handleFilterChange,
        handleChangeSort,
        handleChangeOffset,
        handleChangeLimit
    }
}

export default useRouterFilter