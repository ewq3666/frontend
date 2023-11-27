import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { END_POINTS } from '../../../api/domain';

const Withdraw = () => {

    const [withdrawData, setWithdrawData] = useState([]);
    // console.log(withdrawData, "withdrawData");
    let userInfo = useSelector((state) => state.ReducerFc?.userData[0]);
    // console.log(userInfo, "userdata userdatra");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(END_POINTS.getwidthdrawRequest);
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
        Id: item._id,
        amount: item.amount,
        createdAt: item.createdAt,
        status: item.status,
    }));

    const columns = [
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) =>
                <div>
                    <MdCurrencyRupee style={{ marginTop: 4, fontWeight: 900 }} />
                    {amount}
                </div>,
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => moment(date).format('DD/MM/YYYY'),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            // render: (text) => <p>{console.log("text",text)}</p>,
        },
    ];
    return (
        <div>
            <Table columns={columns} dataSource={mappedData} />
        </div>
    )
}
export default Withdraw