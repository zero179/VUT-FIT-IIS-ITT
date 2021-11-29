import {IUser} from "./User";
import {IPaging} from "./Paging";

export interface IUserResponse {
    results: IUser[]
    paging: IPaging
}