import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import style from './Cards.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { SearchBar } from '../SearchBar/SearchBar';
import { NavLink } from 'react-router-dom';
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
  // Obtener la vista de países para la página actual
  const viewCountries = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  useEffect(() => {
    // Actualizar la lista de países cuando cambia la lista global

    setCountries(countriesGlobal);
  }, [countriesGlobal]);

  useEffect(() => {
    // Actualizar la lista de países cuando cambian los países filtrados

    setCountries(filterCountries);
    setCurrentPage(1); // Volver a la primera página cuando cambian los filtros
  }, [filterCountries]);

  const dispatch = useDispatch();

  // Cambiar de página
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  // Función para filtrar por continente
  const filterByContinent = (e) => {
    // Enviar una acción Redux llamada "continentFilter" con el valor seleccionado
    dispatch(continentFilter(e.target.value));

    // Verificar si se seleccionó "All" en el menú desplegable
    if (e.target.value === 'All') {
      setCountries([...countries]);
    } else {
      // Establecer la lista de países en "filterCountries" (filtrados por continente)
      setCountries([...filterCountries]);
    }
    // Reiniciar el valor seleccionado en el menú desplegable

    e.target.value = '';
  };

  // Función para ordenar por nombre
  const orderName = (e) => {
    // Enviar una acción Redux llamada "orderByName" con el valor seleccionado
    dispatch(orderByName(e.target.value));
    // Reiniciar el valor seleccionado en el menú desplegable de ordenamiento por nombre
    e.target.value = '';
  };
  // Función para ordenar por población
  const orderPopulation = (e) => {
    // Enviar una acción Redux llamada "orderByPopulation" con el valor seleccionado
    dispatch(orderByPopulation(e.target.value));
    // Reiniciar el valor seleccionado en el menú desplegable de ordenamiento por población
    e.target.value = '';
  };

  // Función para filtrar por actividad
  const filterByActivity = (e) => {
    // Enviar una acción Redux llamada "activityFilter" con el valor seleccionado
    dispatch(activityFilter(e.target.value));
    // Verificar si se seleccionó "All" en el menú desplegable
    if (e.target.value === 'All') {
      // Restaurar la lista de países original "countries"
      setCountries([...countries]);
    } else {
      // Establecer la lista de países en "filterCountries" (filtrados por actividad)
      setCountries([...filterCountries]);
    }
    // Reiniciar el valor seleccionado en el menú desplegable
    e.target.value = '';
  };

  // Declaración de la variable "newActivities" 
  let newAcitivities;
  // Verificar si "activities" es un array antes de filtrar duplicados
  if (Array.isArray(activities)) {
    // Filtrar actividades duplicadas
    newAcitivities = activities.filter(
      (obj, index, arr) =>
        index === arr.findIndex((t) => t.Nombre === obj.Nombre)
    );
  }


  // Función para realizar una búsqueda de países por nombre
  const searchCountry = (name) => {
    // Enviar una acción Redux llamada "getCountryByName" 
    dispatch(getCountryByName(name));
    // Establecer la lista de países en "filterCountries" (filtrados) en el estado local
    setCountries([...filterCountries]);
  };

  return (
    <>
      <div className={style.filtersContainer}>
        <div className={style.searchBar}>
          <SearchBar searchCountry={searchCountry} />
        </div>
        <div className={style.filters}>
          {/* Menú desplegable para seleccionar un continente */}
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
          {/* Menú desplegable para ordenar por nombre */}
          <select className={style.selects} onChange={orderName}>
            <option value="" hidden>
              Order
            </option>
            <option value="Ascendente">A - Z</option>
            <option value="Descendente">Z - A</option>
          </select>
          {/* Menú desplegable para ordenar por población */}
          <select className={style.selects} onChange={orderPopulation}>
            <option value="" hidden>
              Population
            </option>
            <option value="Ascendente">More population</option>
            <option value="Descendente">Less population</option>
          </select>
          {/* Menú desplegable para seleccionar una actividad */}
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
            Poblacion={country.Poblacion}
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
      <NavLink className={style.links} to="/">
        Salir
      </NavLink>
    </>
  );
};

export default Cards;
