import { NavLink } from 'react-router-dom';
import styles from './Landing.module.css';

const Landing = () => {
  return (
    <>
      <div className={styles.landing}>
        <div>
          <h1 className={styles.title}>Bienvenidos a Countries</h1>
          <span></span>
          <NavLink to={'/home'}>
            <button className={styles.button}>Home</button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Landing;
