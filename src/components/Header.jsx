import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "../assets/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/userSlice";

const Header = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = localStorage.getItem("userLogin");

    const handleClickCart = () => {
        if (!user) {
            navigate("/login");
        } else {
            navigate("/cart");
        }
    };

    const handleLogout = () => {
        dispatch(logout(user));
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg sticky-top" data-bs-theme="dark" style={{ backgroundColor: "#000000" }}>
            <div className="container-fluid">
                <a className="navbar-brand" href="#" onClick={() => navigate("/")}>
                    <img src="/img/image 3.png" alt="logo" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarContent">
                    <div className="d-flex flex-column flex-lg-row align-items-lg-center ms-auto my-2 my-lg-0">
                        <button className="btn d-flex justify-content-center align-items-center text-white mx-lg-3 my-1 my-lg-0 hoverColor">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="me-1" />
                            <span>Search</span>
                        </button>
                        <div className="d-flex flex-column flex-lg-row align-items-lg-center">
                            <button
                                className="btn text-white d-flex justify-content-center align-items-center my-1 my-lg-0 hoverColor"
                                onClick={handleClickCart}
                            >
                                <FontAwesomeIcon icon={faCartShopping} className="me-1" />
                                <span>{cartItems?.length == 0 ? "" : `(${cartItems?.length})`}</span>
                            </button>
                            {!user ? (
                                <button className="btn text-white mx-lg-4 my-1 my-lg-0 hoverColor" onClick={() => navigate("/login")}>
                                    Login
                                </button>
                            ) : (
                                <button className="btn text-white mx-lg-4 my-1 my-lg-0 hoverColor" onClick={() => navigate("/profile")}>
                                    Profile
                                </button>
                            )}
                            {!user ? (
                                <button className="btn text-white my-1 my-lg-0 hoverColor" onClick={() => navigate("/register")}>
                                    Register
                                </button>
                            ) : (
                                <button className="btn text-white my-1 my-lg-0 hoverColor" onClick={handleLogout}>
                                    Logout
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
