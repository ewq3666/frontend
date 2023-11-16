import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import moment from 'moment';

const Withdraw = () => {

    const [withdrawData, setWithdrawData] = useState([]);
    console.log(withdrawData, "withdrawData");
    let userInfo = useSelector((state) => state.ReducerFc?.userData[0]);
    console.log(userInfo, "userdata userdatra");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://backendupdated.vercel.app/api/withdraw-request/");
                console.log(response, "withdraw");
                setWithdrawData(response.data)
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const mappedData = withdrawData.map((item, index) => ({
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
export default Withdraw