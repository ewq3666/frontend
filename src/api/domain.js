const api = process.env.REACT_APP_API

export const END_POINTS={
     users  :`${api}`,
     signup : `${api}/signup`,
     login  :`${api}/login`,
     handleDuplicateEmail  :`${api}/email`,
     verify  :`${api}/verify`,
     orders  :`${api}/orders`,
     orders  :`${api}/admin/contest`,
}