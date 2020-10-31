import React, { useState } from 'react';
import CardItem from './CardItem';

const Main = () => {

    const [globalData, setGlobalData] = useState([]);
    const [isLoading, setIsloading] = useState(true);

    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const day = currentDate.getDate();

    useState(() => {
        fetch('https://disease.sh/v3/covid-19/all')
            .then(res => res.json())
            .then(response => {
                console.log("Main -> response", response)
                setGlobalData(response)


                setTimeout(() => setIsloading(false), 3000);
            })
            .catch((err) => console.log('fallo la wea ', err));
    }, []);


    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const ListGlobalItem = Object.keys(globalData).map((item) =>
        <CardItem key={item} className="card-item" title={item} count={numberWithCommas(globalData[item])} />
    );


    return (
        <>
            <div className="header"></div>
            <section className="subheader shadow-bottom">
                <h1 className="subheader__title">COVID Info APP</h1>
                <h6 className="subheader__subtitle">Developed with React</h6>
            </section>
            <span className="date__title">Current Date: {day}/{month}/{year}</span>
            {
                isLoading
                    ? <div className="loader"></div>
                    : <div className="main">{ListGlobalItem}</div>
            }
        </>
    )
}

export default Main;