import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = () => {
  return (
    <div className={styles.mainContainer}>
      <NavLink className={styles.links} to="/home">
        HOME
      </NavLink>
      <NavLink className={styles.links} to="/form">
        ACTIVITY
      </NavLink>
    </div>
  );
};
export default NavBar;
