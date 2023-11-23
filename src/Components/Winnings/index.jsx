import { List } from 'antd';
import React, { useEffect, useState } from 'react';

const Winnings = (props) => {

    return (
        <div>
            <List
                size="large"
                header={
                    <div
                        style={{ display: "flex", justifyContent: "space-between", fontWeight: "800", paddingLeft: "32px" }}
                    >
                        <span>Rank</span>
                        <span>Amount</span>
                    </div>
                }
                // footer={<div>Footer</div>}
                // bordered
                dataSource={props.winnings}
                renderItem={(item, index) =>
                    <List.Item
                        style={index % 2 === 0 ? { backgroundColor: '#f0f0f0' } : null}
                    >
                        <span>{item.from == item.to ? "# " + item.from : "# " + item.from + " - " + item.to}</span>
                        <span>{item.amount}</span>
                    </List.Item>}
            />
        </div>
    );
};

export default Winnings;