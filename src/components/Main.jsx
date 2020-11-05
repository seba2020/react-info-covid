import React, { useState, useEffect } from 'react';
import CardItem from './CardItem';

const Main = () => {

    const [globalData, setGlobalData] = useState([]);
    const [continentData, setContinentData] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [continents, setContinents] = useState([]);
    const [selectContinent, setSelectContinent] = useState('00');
    const [filterData, setFilterData] = useState([]);

    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const day = currentDate.getDate();

    useEffect(() => {
        getGlobalData();
        getContinentsData();
    }, []);

    const getGlobalData = () => {
        return fetch('https://disease.sh/v3/covid-19/all')
            .then(res => res.json())
            .then(response => {
                setGlobalData(response)
            })
            .catch((err) => console.log('err get all info ', err));
    }

    const getContinents = (data) => {
        setContinents([]);
        const continentsMap = data.map(item => item.continent);
        setContinents([...continents, ...continentsMap]);
    }

    const getContinentsData = () => {
        return fetch('https://disease.sh/v3/covid-19/continents')
            .then(res => res.json())
            .then(response => {
                setContinentData(response);
                getContinents(response);
            })
            .catch(err => console.log('err get all continents ', err));
    }

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const Items = Object.keys(filterData).map((item) =>
        <CardItem key={item} className="card-item" title={item} count={numberWithCommas(filterData[item])} />
    );

    const optionContinent = continents.map((item) =>
        <option key={Math.floor(Math.random() * 1000)}>{item}</option>
    );

    const handleSelectContinent = (event) => {
        setIsloading(true);
        setSelectContinent(event.target.value);
        if (event.target.value === '0') {
            fakeLazyLoading();
            setFilterData(globalData);
        } else {
            const filteredData = continentData.find(item => item.continent === event.target.value);
            fakeLazyLoading();
            setFilterData(filteredData);
        }
    }

    const fakeLazyLoading = () => {
        setTimeout(() => {
            setIsloading(false);
        }, 1000);
    }


    return (
        <>
            <div className="header"></div>
            <section className="subheader shadow-bottom">
                <h1 className="subheader__title">COVID Info APP</h1>
                <h6 className="subheader__subtitle">Developed with React</h6>
            </section>
            <span className="date__title">Current Date: {day}/{month}/{year}</span>

            <select onChange={handleSelectContinent} value={selectContinent}>
                <option value="00" disabled>--Selection--</option>
                <option value="0">All Continents</option>
                {optionContinent}
            </select>
            {
                isLoading
                    ? <div className="loader"></div>
                    : <div className="main">{Items}</div>
            }
        </>
    )
}

export default Main;