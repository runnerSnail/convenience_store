import React from 'react';
import { Menu, Icon } from 'antd';
import './menu.css';

export class Sider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKeys: ['1'],
            all: 14,
            enterFalg: false
        }
    }
    handleClick = e => {
        console.log('click ', e);
        this.setState({
            selectedKeys: [e.key]
        })
    };
    /**
     * enter 事件发生
     */
    enter = () => {
        const { setSelected, snippets, setList } = this.props;
        const { selectedKeys } = this.state;
        const snippet = snippets[selectedKeys[0] - 1];
        if (snippets) {
            if (snippet.content) {
                this.copyText();
                // alert('copy');
                electron.ipcRenderer.send('copy');
            } else {
                const newList = [];
                snippets.map((item) => {
                    if (item.pid === snippet.id)
                        newList.push(item);
                })
                this.setState({
                    enterFalg: true
                })
                setList(newList);
                setSelected(1);
            }
        }
    }

    onKeyDown = (e) => {
        let ref = this.refs.menu;
        let current = this.state.selectedKeys[0];
        if (e.keyCode === 38) {
            current--;
        }
        else if (e.keyCode === 40) {
            current++;
        } else if (e.keyCode === 13) {
            this.enter();
        } else if (e.keyCode === 27) {
            this.esc();
        }
        else {
            return;
        }
        if (current < 0) {
            current = this.props.snippets ? (this.props.snippets.length + '') : '1';
        }
        else if (this.props.snippets && (current > this.props.snippets.length)) {
            current = '1';
        }
        else {
            current = current + '';
        }
        this.setState({
            selectedKeys: [current]
        })
        current *= 52;
        ref.scrollTop = (current - 380) < 0 ? 0 : current - 380;
        const { setSelected } = this.props;
        const { selectedKeys } = this.state;
        setSelected(selectedKeys[0] || 1);
        e.preventDefault();
    }

    /**
     * esc 事件发生
     */
    esc = () => {
        const { setList, orignData } = this.props;
        if (this.state.enterFalg) {
            setList(orignData);
            this.setState({
                enterFalg: false
            })
        } else {
            // alert('退出');
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.onKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.onKeyDown);
    }
    render() {
        return (
            <div className="menu" ref="menu">
                <Menu
                    onClick={this.handleClick}
                    style={{ width: 256 }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    selectedKeys={this.state.selectedKeys}
                >
                    {
                        this.props.snippets && this.props.snippets.map((item, index) => {
                            return (
                                <Menu.Item key={index - 0 + 1} onClick={
                                    () => {
                                        this.props.setSelected(index-0+1);
                                        this.setState({
                                            selectedKeys: [index-0+1]
                                        },()=>{
                                            this.enter();
                                        })
                                    }
                                }>
                                    <Icon type="file-text"></Icon>
                                    {item.name}
                                    <Icon type="enter" className="float-right" />
                                </Menu.Item>
                            )
                        })
                    }

                </Menu>
            </div>

        );
    }
    copyText = () => {
        let e = document.getElementById("contents");//获取textarea的id
        e.value = document.getElementById("copyBtn").innerText;//把标签的文本内容赋值给textarea
        e.select(); //选择textarea的文本内容
        document.execCommand("Copy"); //执行浏览器复制命令
    }
}
