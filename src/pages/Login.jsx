import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { loginSuccess } from "../redux/slices/userSlice";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
        if (loginError) setLoginError("");
    };

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email.trim()) {
            newErrors.email = "Email không được để trống";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Email không đúng định dạng";
        }

        if (!formData.password) {
            newErrors.password = "Mật khẩu không được để trống";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoginError("");

        try {
            const res = await axios.post("https://apistore.cybersoft.edu.vn/api/Users/signin", {
                email: formData.email.trim(),
                password: formData.password,
            });

            // Lưu thông tin user (email, accessToken) lên Redux Store và localStorage
            dispatch(loginSuccess(res.data.content));

            // Điều hướng về trang chủ (hoặc trang /cart nếu trước đó bị chặn)
            navigate("/");
        } catch (err) {
            const msg = err.response?.data?.message || "Email hoặc mật khẩu không chính xác!";
            setLoginError(msg);
        }
    };

    return (
        <div>
            <Header />
            <div className="container min-vh-100">
                <h1 className="my-5">Login</h1>
                <div className="mb-5" style={{ borderBottom: "2px solid #ccc" }}></div>
                <div className="d-flex justify-content-center">
                    <form onSubmit={handleSubmit} className="w-50">
                        {/* Email */}
                        <div className="mb-4">
                            <label className="form-label fw-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="email"
                                className="form-control border-0 py-2 px-3"
                                style={{ backgroundColor: "#e9ecef" }}
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <div className="text-danger small mt-1">{errors.email}</div>}
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <label className="form-label fw-medium">Password</label>
                            <div className="position-relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="password"
                                    className="form-control border-0 py-2 px-3 pe-5"
                                    style={{ backgroundColor: "#e9ecef" }}
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="position-absolute top-50 end-0 translate-middle-y me-3 text-secondary"
                                    style={{ cursor: "pointer" }}
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </span>
                            </div>
                            {errors.password && <div className="text-danger small mt-1">{errors.password}</div>}
                        </div>

                        {/* Thông báo lỗi sai tài khoản/mật khẩu từ API */}
                        {loginError && <div className="text-danger text-center small mb-3 fw-medium">{loginError}</div>}

                        {/* Register now ? & Nút LOGIN */}
                        <div className="d-flex justify-content-end align-items-center gap-3 mb-3">
                            <NavLink to="/register" className="text-decoration-none fw-medium" style={{ color: "#3b5998" }}>
                                Register now ?
                            </NavLink>
                            <button
                                type="submit"
                                className="btn text-white text-uppercase fw-semibold rounded-pill px-5 py-2 shadow-sm"
                                style={{ backgroundColor: "#6200ee" }}
                            >
                                LOGIN
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
