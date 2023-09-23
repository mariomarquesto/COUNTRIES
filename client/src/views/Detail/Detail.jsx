import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { clearDetail, getCountry } from '../../redux/actions';
import styles from './Detail.module.css';

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Obtiene el parámetro 'id' de la URL

  const country = useSelector((state) => state.detailCountry); // Obtiene el estado del país desde Redux

  console.log("country", country);

  useEffect(() => {
    // Cuando el componente se monta, solicita los detalles del país con el 'id' proporcionado
    dispatch(getCountry(id));

    // Define una función de limpieza que se ejecutará cuando el componente se desmonte
    return () => {
      dispatch(clearDetail()); // Limpia los detalles del país en el estado Redux
    };
  }, [dispatch, id]);

  return (
    <div className={styles.container}>
      {country.Nombre ? (
        // Si existe un nombre de país en el estado Redux, muestra los detalles
        <div className={styles.detailContainer}>
          <div className={styles.information}>
            <img
              className={styles.flagImg}
              src={country.Imagendelabandera}
              alt="flag"
            />
            <h3>id: {country?.id}</h3>
            <h3>Nombre: {country?.Nombre}</h3>
            <h3>Continente: {country?.Continente}</h3>
            <h3>Capital: {country?.Capital}</h3>
            {country.Subregión && <h3>Subregión: {country.Subregión}</h3>}
            {country.Área && <h3>Área: {country.Área} Km²</h3>}
            <h3>Población: {country?.Población}</h3>
          </div>

          <div className={styles.actContainer}>
            <h2>Activities</h2>
            <div className={styles.cardsContainer}>
              {country.Activities?.length ? (
                // Si hay actividades en el país, muestra cada una
                country.Activities.map((activity) => (
                  <div className={styles.activities} key={activity.id}>
                    <h3>{activity.Nombre.toUpperCase()}</h3>
                    <p>Difficulty: {activity.Dificultad} (1-5)</p>
                    <p>Duration: {activity.Duración} hours</p>
                    <p>Season: {activity.Temporada}</p>
                  </div>
                ))
              ) : (
                // Si no hay actividades, muestra un mensaje y un botón para crear una
                <div>
                  <h2>No activities yet</h2>
                  <NavLink to="/form">
                    <button className={styles.createBtn}>Create one</button>
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        // Si no hay un nombre de país en el estado Redux, muestra un indicador de carga
        <div className={styles.loadingContainer}>
          <img className={styles.loading} src={""} alt="loading-img" />
        </div>
      )}

      {/* Botón para volver a la página de inicio */}
      <NavLink to="/home">
        <button className={styles.homeBtn}>Back to Home</button>
      </NavLink>
    </div>
  );
};

export default Detail;
