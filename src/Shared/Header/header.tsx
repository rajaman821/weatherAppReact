import styles from './Header.module.scss';
import logo from '../../Assets/Group 10.png';

const Header = () => {

    return (
        <>
            <nav className={styles.navbar}>
                <ul className={styles.navLinks}>
                    <li className={styles.navItem}>
                        <a>
                            <img src={logo} height='34px' className={styles.navbarItems} />
                        </a>
                    </li>
                    <h2 className={styles.logoTitle}>Weather Forecaster</h2>
                </ul>
            </nav>
        </>
    )
};

export default Header;