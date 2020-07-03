
/**
 * 处理树数据
 * @param {*} dealTreeData 树数据
 * @param {*} currentKey  要更改title的key
 * @param {*} value 该更改的内容
 */
export function dealTreeData(dealTreeData, currentTitleKey, value) {
    dealTreeData.map((elem, index) => {
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
    return dealTreeData
}