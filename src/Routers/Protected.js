import { useNavigate } from "react-router"
import { useEffect } from "react"
import { getCookie } from "../Helper/Cookie"
// import { useGetUserByIdQuery } from "../Service/getUsers"
// import { storeUser } from "../Redux/Slice/user"
// import { useDispatch } from "react-redux"

const Protected = (props) => {
    const { Component } = props
    // const { data: currentUser } = useGetUserByIdQuery();
    const navigate = useNavigate()
    // const dispatch = useDispatch()

    useEffect(() => {
        // if (currentUser) {
        //     dispatch(storeUser(currentUser))
        // }
        // else {
            navigate("/login")
        // }
    }, [currentUser])
    useEffect(() => {
        let token = getCookie('token')
        if (!token) {
            navigate('/login')
        }
    })

    return (
        <Component />
    )
}

export default Protected