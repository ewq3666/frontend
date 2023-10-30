import { useNavigate } from "react-router"
import { useEffect } from "react"
import { getCookie } from "../Helper/Cookie"
// import { useGetUserByIdQuery } from "../Service/getUsers"
// import { storeUser } from "../Redux/Slice/user"
// import { useDispatch } from "react-redux"

const Protected = (props) => {
    const { Component } = props
    const navigate = useNavigate()
    let token = localStorage.getItem("token")
    useEffect(() => {
        if (!token) {
            navigate("/")
        }
    }, [token])

    return (
        <Component />
    )
}

export default Protected
