const api = process.env.REACT_APP_API

export const END_POINTS = {
     users: `${api}`,
     signup: `${api}/signup`,
     login: `${api}/login`,
     handleDuplicateEmail: `${api}/email`,
     userInfo: `${api}/user`,
     verify: `${api}/verify`,
     orders: `${api}/orders`,
     addmoney: `${api}/addmoney`,
     contest: `${api}/admin/contest`,
     getBalence: `${api}/balance/`,
     widthdrawRequest: `${api}/withdraw-request`,
     joinContest: `${api}/joincontest`,
}