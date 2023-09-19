import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import style from './Cards.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { SearchBar } from '../SearchBar/SearchBar';
import {
  continentFilter,
  activityFilter,
  orderByName,
  orderByPopulation,
  getCountryByName,
} from '../../redux/actions';

const Cards = () => {
  const countriesGlobal = useSelector((state) => state.countries);
  const activities = useSelector((state) => state.activities);
  const filterCountries = useSelector((state) => state.filteredCountries);
  // Estado countries
  const [countries, setCountries] = useState([]);
  // Estado currentPage
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Calcular el índice del primer y último país en la página actual
  const indexOfLastCountry = currentPage * itemsPerPage;
  const indexOfFirstCountry = indexOfLastCountry - itemsPerPage;
  const viewCountries = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  useEffect(() => {
    setCountries(countriesGlobal);
  }, [countriesGlobal]);

  useEffect(() => {
    setCountries(filterCountries);
    setCurrentPage(1);
  }, [filterCountries]);

  const dispatch = useDispatch();

  // Cambiar de página
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const filterByContinent = (e) => {
    dispatch(continentFilter(e.target.value));

    if (e.target.value === 'All') {
      setCountries([...countries]);
    } else {
      setCountries([...filterCountries]);
    }
    e.target.value = '';
  };

  const orderName = (e) => {
    dispatch(orderByName(e.target.value));
    e.target.value = '';
  };

  const orderPopulation = (e) => {
    dispatch(orderByPopulation(e.target.value));
    e.target.value = '';
  };

  const filterByActivity = (e) => {
    dispatch(activityFilter(e.target.value));
    if (e.target.value === 'All') {
      setCountries([...countries]);
    } else {
      setCountries([...filterCountries]);
    }
    e.target.value = '';
  };

  let newAcitivities;

  if (Array.isArray(activities)) {
    newAcitivities = activities.filter(
      (obj, index, arr) =>
        index === arr.findIndex((t) => t.Nombre === obj.Nombre)
    );
  }

  const searchCountry = (name) => {
    dispatch(getCountryByName(name));
    setCountries([...filterCountries]);
  };

  return (
    <>
      <div className={style.filtersContainer}>
        <div className={style.searchBar}>
          <SearchBar searchCountry={searchCountry} />
        </div>
        <div className={style.filters}>
          <select className={style.selects} onChange={filterByContinent}>
            <option value="" hidden>
              Continent
            </option>
            <option value="All">All</option>
            <option value="Africa">Africa</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>

          <select className={style.selects} onChange={orderName}>
            <option value="" hidden>
              Order
            </option>
            <option value="Ascendente">A - Z</option>
            <option value="Descendente">Z - A</option>
          </select>

          <select className={style.selects} onChange={orderPopulation}>
            <option value="" hidden>
              Population
            </option>
            <option value="Ascendente">More population</option>
            <option value="Descendente">Less population</option>
          </select>

          <select
            className={style.selects}
            name="activity"
            onChange={filterByActivity}
          >
            <option value="" hidden>
              Activity
            </option>
            <option value="All">All</option>

            {Array.isArray(newAcitivities) ? (
              newAcitivities.map((activity) => {
                return (
                  <option key={activity.id} value={activity.Nombre}>
                    {activity.Nombre}
                  </option>
                );
              })
            ) : (
              <option value="" disabled>
                Create a new activity
              </option>
            )}
          </select>
        </div>
      </div>

      <div className={style.container}>
        {/* Card */}
        {viewCountries.map((country) => (
          <Card
            key={country.id}
            id={country.id}
            nombre={country.Nombre}
            continente={country.Continente}
            Imagendelabandera={country.Imagendelabandera}
          />
        ))}

        {/* Paginación */}
        <div className={style.pagination}>
          {/* Botón de retroceso */}
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={style.paginationbutton}
          >
            Retroceder
          </button>

          {/* Número de página actual */}
          <span className={style.pageNumber}>{currentPage}</span>

          {/* Botón de avance */}
          <button
            onClick={goToNextPage}
            disabled={
              currentPage === Math.ceil(countries.length / itemsPerPage)
            }
            className={style.paginationButton}
          >
            Avanzar
          </button>
        </div>
      </div>
    </>
  );
};

export default Cards;
