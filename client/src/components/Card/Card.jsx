import { NavLink } from 'react-router-dom';
import styles from './Card.module.css';

const Card = (props) => {
  const { id, nombre, Imagendelabandera, continente } = props;
  return (

    <NavLink className={styles.navlink} to={`/countries/${id}`}>
      <div className={styles.card}>
        <img
          className={styles.cardImg}
          src={Imagendelabandera}
          alt={`bandera de ${nombre}`}
        />
        <h2 className={styles.cardName}>{nombre}</h2>
        <h3 className={styles.cardContinent}>{continente}</h3>
        
      </div>
    </NavLink>

  );
};

export default Card;
