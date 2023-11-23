import { List } from 'antd';
import React, { useEffect, useState } from 'react';

const Leaderboard = ({users}) => {

    return (
        <div>
            <List
                size="large"
                header={
                    <div
                        style={{ display: "flex", justifyContent: "space-between", fontWeight: "800", paddingLeft: "32px" }}
                    >
                      
                        <span>users</span>
                    </div>
                }
                // footer={<div>Footer</div>}
                // bordered
                dataSource={users}
                renderItem={(item, index) =>
                    <List.Item
                        style={index % 2 === 0 ? { backgroundColor: '#f0f0f0' } : null}
                    >
                        <span>{item}</span>
                    </List.Item>}
            />
        </div>
    );
};

export default Leaderboard;