import { NavLink } from "react-router-dom";
import homeIcon from "../../assets/home.svg";
import productsIcon from "../../assets/products.svg";
import LoggedUser from "../LoggerUser";
import "./styles.css";

export default function HeaderAdmin() {
    return (
        <header className="dsc-header-admin">
            <nav className="dsc-container">
                <h1>DSC Admin</h1>
                <div className="dsc-navbar-right">
                    <div className="dsc-menu-items-container">
                        <NavLink to="/admin/home" className={({ isActive }) => isActive ? "dsc-menu-item dsc-menu-item-active" : "dsc-menu-item"}>
                            <div>
                                <img src={homeIcon} alt="Início" />
                                <p>Início</p>
                            </div>
                        </NavLink>
                        <NavLink to="/admin/products" className={({ isActive }) => isActive ? "dsc-menu-item dsc-menu-item-active" : "dsc-menu-item"}>
                            <div>
                                <img src={productsIcon} alt="Cadastro de produtos" />
                                <p>Produtos</p>
                            </div>
                        </NavLink>
                    </div>
                    <LoggedUser />
                </div>
            </nav>
        </header>
    );
}