import { React } from 'react';

const CardItem = (props) => {
    return (
        <div className="card-item">
            <h4 className="card-item__title">{props.title}</h4>
            <h2 className="card-item__count">{props.count}</h2>
        </div>
    );
}

export default CardItem;