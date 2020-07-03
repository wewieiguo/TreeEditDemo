import React, { useState } from 'react'
import "./TreeComponent.css"
import { Tree, Input } from 'antd';

const { TreeNode } = Tree;
export default function TreeComponent() {
    const [treeData, setTreeData] = useState([
        {
            title: '0-0',
            key: '0-0',
            children: [
                {
                    title: '0-0-0',
                    key: '0-0-0',
                    children: [
                        { title: '0-0-0-0', key: '0-0-0-0' },
                        { title: '0-0-0-1', key: '0-0-0-1' },
                        { title: '0-0-0-2', key: '0-0-0-2' },
                    ],
                },
                {
                    title: '0-0-1',
                    key: '0-0-1',
                    children: [
                        { title: '0-0-1-0', key: '0-0-1-0' },
                        { title: '0-0-1-1', key: '0-0-1-1' },
                        { title: '0-0-1-2', key: '0-0-1-2' },
                    ],
                },
                {
                    title: '0-0-2',
                    key: '0-0-2',
                },
            ],
        },
        {
            title: '0-1',
            key: '0-1',
            children: [
                { title: '0-1-0-0', key: '0-1-0-0' },
                { title: '0-1-0-1', key: '0-1-0-1' },
                { title: '0-1-0-2', key: '0-1-0-2' },
            ],
        },
        {
            title: '0-2',
            key: '0-2',
        },])
    const [currentTitleKey, setCurrentTitleKey] = useState("")
    /**
     * 点击修改
     */
    const editTitle = (key) => {
        if (currentTitleKey) {
            setCurrentTitleKey("")
        } else {
            setCurrentTitleKey(key)
        }
    }
    /**
     * 修改title
     */
    const onChangeTitle = (value) => {
        console.log(currentTitleKey, "123");
        console.log(value, "123");
        const newTreeData = treeData.map((elem, index) => {
            if (elem.key === currentTitleKey) {
                elem.title = value
            } else {
                if (elem.children && elem.children.length) {
                    elem.children.map((ele, inde) => {
                        if (ele.key === currentTitleKey) {
                            ele.title = value
                        } else {
                            if (ele.children && ele.children.length) {
                                ele.children.map((el, ind) => {
                                    if (el.key === currentTitleKey) {
                                        el.title = value
                                    }
                                    return el
                                })
                            }
                        }
                        return ele
                    });
                }
            }
            return elem
        });
        setTreeData(newTreeData)
    }

    /**
     * renderTitleComponent
     * @param {*} elem 当前对象
     */
    const renderTitle = (elem) => {
        return (
            <section className="title-container">
                {currentTitleKey === elem.key
                    ? <Input
                        placeholder="请输入title"
                        value={elem.title}
                        onChange={(e) => {
                            const value = e.target.value;
                            onChangeTitle(value)
                        }}
                    />
                    : <span>{elem.title}</span>}<button className="edit-button" onClick={() => editTitle(elem.key)}></button>
            </section>
        )
    }
    return (
        <section>
            <Tree
                defaultExpandAll
            >
                {treeData.map((elem, index) => {
                    return elem.children && elem.children.length ?
                        <TreeNode title={renderTitle(elem)} key={elem.key}>
                            {elem.children.map((ele, inde) => {
                                return ele.children && ele.children.length ?
                                    <TreeNode title={renderTitle(ele)} key={ele.key} >
                                        {ele.children.map((el, ind) => {
                                            return <TreeNode title={renderTitle(el)} key={el.key}></TreeNode>
                                        })}
                                    </TreeNode>
                                    : <TreeNode title={renderTitle(ele)} key={ele.key} ></TreeNode>
                            })}
                        </TreeNode>
                        : <TreeNode title={renderTitle(elem)} key={elem.key}  >  </TreeNode>
                })}
            </Tree>
        </section>
    )
}
