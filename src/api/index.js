import {apiGetMyCompany, apiAddCompany} from "src/api/actions/company";
import {apiGetUser, apiPatchUser} from "src/api/actions/user";


export const api = {
    getMyCompany: apiGetMyCompany,
    addCompany: apiAddCompany,
    getUser: apiGetUser,
    patchUser:apiPatchUser
}
