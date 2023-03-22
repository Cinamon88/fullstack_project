import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const user = 1;

    return (
        <nav>
            <div className={styles.nav_wrapper}>
                <NavLink to="/" className={styles.logo}>
                    <h2>Ads App</h2>
                </NavLink>
                <ul className={styles.nav_list}>
                    <li>
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? styles.linkActive : undefined
                            }
                            to="/"
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        {!user && (
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? styles.linkActive : undefined
                                }
                                to="/login"
                            >
                                Sign in
                            </NavLink>
                        )}
                    </li>
                    <li>
                        {!user && (
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? styles.linkActive : undefined
                                }
                                to="/register"
                            >
                                Register
                            </NavLink>
                        )}
                    </li>
                    <li>
                        {user && (
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? styles.linkActive : undefined
                                }
                                to="/logout"
                            >
                                Logout
                            </NavLink>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
};


export default Header;