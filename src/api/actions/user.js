export const apiGetUser = async () => {
    return await fetch('/api/user', {
        method: "get"
    })
}
export const apiPatchUser = async (params)=> {
    console.log(params)
    return await fetch('api/user', {
        method:"patch",
        body:JSON.stringify(params)
    })
}
