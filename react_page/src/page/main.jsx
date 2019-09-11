import React, { useState, useEffect } from 'react';
import { InputInMain } from './component/input.jsx';
import { Sider } from './component/menu.jsx';
import { Col } from 'antd';

import './main.css';
import { Content } from './component/content.jsx';

/**
 * 测试数据
 */
const data = [{
    "id": 1,
    "pid": 0,
    "name": "angular",
    "level": 1,
    "content": null
}, {
    "id": 3,
    "pid": 0,
    "name": "react",
    "content": "ddddd",
    "level": 1
},{
    "id": 2,
    "pid": 1,
    "content": "<button></button>",
    "name": "angular button",
    "level": 2
}];

export const Main = () => {
    const [list, setList] = useState(data);
    const [slected, setSelected] = useState(1);
    return (
        <div>
            <InputInMain> </InputInMain>
            <Col span={24}>
                <Col span={12}>
                    <Sider snippets={list} setSelected = {setSelected} setList={setList} orignData={data}></Sider>
                </Col>
                <Col span={12}>
                    <Content content={list[slected-1]}></Content>
                </Col>
            </Col>
        </div>
    )
}