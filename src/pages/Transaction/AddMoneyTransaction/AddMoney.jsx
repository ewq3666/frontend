import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { MdCurrencyRupee } from "react-icons/md";

const AddMoney = () => {

    const [depositeData, setDepositeData] = useState([]);
    let userInfo = useSelector((state) => state.ReducerFc?.userData[0]);
    // console.log(userInfo, "userdata userdatra");
    // console.log(depositeData, "deposite");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://backendupdated.vercel.app/api/addmoney/${userInfo._id}`);
                // console.log(response, "deposite");
                setDepositeData(response.data)
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const mappedData = depositeData.map((item, index) => ({
        key: index.toString(),
        orderId: item.orderId,
        amount: item.amount,
        createdAt: item.createdAt,
    }));

    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'orderId',
            key: 'orderId',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) => 
                <div>
                    <MdCurrencyRupee style={{ marginTop: 4, fontWeight: 900 }} />
                     {amount}
                </div>
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => moment(date).format('DD/MM/YYYY'),
        },
    ];
    return (
        <div>
            <Table columns={columns} dataSource={mappedData} />
        </div>
    )
}

export default AddMoney