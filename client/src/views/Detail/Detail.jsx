import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { clearDetail, getCountry } from '../../redux/actions';
import styles from './Detail.module.css';


const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const country = useSelector((state) => state.detailCountry);

  console.log("country", country)

  useEffect(() => {
    dispatch(getCountry(id));
    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, id]);

  return (
    <div className={styles.container}>
      {country.Nombre ? (
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
                country.Activities.map((activity) => (
                  <div className={styles.activities} key={activity.id}>
                    <h3>{activity.Nombre.toUpperCase()}</h3>
                    <p>Difficulty: {activity.Dificultad} (1-5)</p>
                    <p>Duration: {activity.Duración} hours</p>
                    <p>Season: {activity.Temporada}</p>
                  </div>
                ))
              ) : (
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
        <div className={styles.loadingContainer}>
          <img className={styles.loading} src={""} alt="loading-img" />
        </div>
      )}

      <NavLink to="/home">
        <button className={styles.homeBtn}>Back to Home</button>
      </NavLink>
    </div>
  );

};

export default Detail;
