const api = process.env.REACT_APP_API

export const END_POINTS={
     users  :`${api}`,
     signup : `${api}/signup`,
     login  :`${api}/login`,
     verify  :`${api}/verify`,
     orders  :`${api}/orders`,
     contest  :`${api}/admin/contest`,
}