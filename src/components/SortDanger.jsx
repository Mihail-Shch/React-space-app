import React from 'react'

const SortDanger = React.memo(function SortDanger({ onClickDanger }) {
    return (
        <div className="content__checkbox-wrapper">
            <input type="checkbox" id="danger" className="content__checkbox" onClick={onClickDanger} />
            <label htmlFor="danger" className="content__checkbox-label">Показать только опасные</label>
        </div>
    )
})

export default SortDanger
