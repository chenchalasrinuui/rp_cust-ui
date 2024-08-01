import React from 'react'

export const List = (props) => {
    const { items, isShowImage, columns, imgColumns } = props;
    return <div>
        {
            items.map((obj) => {
                return <div>
                    {
                        isShowImage && imgColumns.map((imgCol, index) => {
                            return <img key={index} src={obj[imgCol]} />
                        })
                    }
                    {
                        columns.map((col, index) => {
                            return <span key={index} >{obj[col]}</span>
                        })
                    }
                </div>
            })
        }
    </div>
}
