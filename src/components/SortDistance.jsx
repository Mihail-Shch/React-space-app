import React from 'react';
import classNames from 'classnames';

const SortDistance = React.memo(function SortDistance({ onClickDistance, activeDistance }) {
    return (
        <div className="content__distance-wrapper">
            <button href="#" className={classNames('content__btn', {
                'active': activeDistance === 0
            })} onClick={() => onClickDistance(0)}>Расстояние <span>в километрах,</span></button>
            <button href="#" className={classNames('content__btn', {
                'active': activeDistance === 1
            })} onClick={() => onClickDistance(1)}>в дистанциях <span>до луны</span></button>
        </div>
    )
})

export default SortDistance
