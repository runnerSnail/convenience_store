import React, { useEffect,useRef } from 'react'
import ReactDOM from 'react-dom';
import { Input } from 'antd';
export const InputInMain = () => {
    const inputEl = useRef(null);
    useEffect(()=>{
        inputEl.current.focus();
    })
    return (
        <Input placeholder="search snippets" ref={inputEl}/>
    )
}