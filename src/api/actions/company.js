export const apiAddCompany = async (params) => {
    return await fetch('/api/companies', {
        method: "put",
        body: JSON.stringify(params)
    })
}
export const apiGetMyCompany = async () => {
    return await fetch('/api/companies', {
        method: "get",
    })
}
