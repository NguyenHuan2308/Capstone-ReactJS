import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Footer from "../components/Footer";
import Header from "../components/Header";
import { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [isAccount, setIsAccount] = useState(true);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        passwordConfirm: "",
        name: "",
        phone: "",
        gender: true,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleGenderChange = (value) => {
        setFormData((prev) => ({
            ...prev,
            gender: value,
        }));
    };

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{9,11}$/;

        if (!formData.email.trim()) {
            newErrors.email = "Email không được để trống";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Email không đúng định dạng";
        }

        if (!formData.password) {
            newErrors.password = "Mật khẩu không được để trống";
        } else if (formData.password.length < 6) {
            newErrors.password = "Mật khẩu phải từ 6 ký tự trở lên";
        }

        if (!formData.passwordConfirm) {
            newErrors.passwordConfirm = "Vui lòng xác nhận lại mật khẩu";
        } else if (formData.passwordConfirm !== formData.password) {
            newErrors.passwordConfirm = "Mật khẩu xác nhận không khớp";
        }

        if (!formData.name.trim()) {
            newErrors.name = "Tên không được để trống";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Số điện thoại không được để trống";
        } else if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = "Số điện thoại phải gồm 9 - 11 chữ số";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setSubmitStatus(null);
        try {
            const payload = {
                email: formData.email.trim(),
                password: formData.password,
                name: formData.name.trim(),
                gender: formData.gender,
                phone: formData.phone.trim(),
            };

            const res = await axios.post("https://apistore.cybersoft.edu.vn/api/Users/signup", payload);
            console.log(res);
            console.log("thành công", payload);
            setSubmitStatus("success");
            setIsAccount(false);
            setFormData({
                email: "",
                password: "",
                passwordConfirm: "",
                name: "",
                phone: "",
                gender: true,
            });
        } catch (err) {
            console.log(err);
            setSubmitStatus("error");
        }
    };

    const handleTogglePassword = () => {
        setShowPassword((prev) => {
            const next = !prev;
            return next;
        });
    };

    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    return (
        <div>
            <Header />
            <div className="container min-vh-100">
                <h1 className="my-5">Register</h1>
                <div className="mb-5" style={{ borderBottom: "2px solid #ccc" }}></div>

                <form onSubmit={handleSubmit}>
                    <div className="row g-4 g-md-5 justify-content-between">
                        <div className="col-12 col-md-5">
                            <div className="mb-4 d-flex flex-column">
                                <label htmlFor="inputEmail" className="form-label">
                                    Email
                                </label>
                                <input
                                    id="inputEmail"
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email..."
                                    style={{ backgroundColor: "#e9ecef" }}
                                    className="form-control py-2 px-3"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <div className="text-danger small mt-1">{errors.email}</div>}
                            </div>
                            <div className="mb-4 d-flex flex-column">
                                <label htmlFor="inputPassword" className="form-label">
                                    Password
                                </label>
                                <div className="position-relative">
                                    <input
                                        id="inputPassword"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password..."
                                        style={{ backgroundColor: "#e9ecef" }}
                                        className="form-control py-2 px-3"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <FontAwesomeIcon
                                        icon={showPassword ? faEyeSlash : faEye}
                                        onClick={handleTogglePassword}
                                        className="position-absolute top-50 end-0 translate-middle-y me-3 text-secondary"
                                        style={{ cursor: "pointer", width: "15px", height: "15px" }}
                                    />
                                </div>
                                {errors.password && <div className="text-danger small mt-1">{errors.password}</div>}
                            </div>
                            <div className="d-flex flex-column">
                                <label htmlFor="inputConfirmPassword" className="form-label">
                                    Password Confirm
                                </label>
                                <div className="position-relative">
                                    <input
                                        id="inputConfirmPassword"
                                        name="passwordConfirm"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Enter your password confirm..."
                                        style={{ backgroundColor: "#e9ecef" }}
                                        className="form-control py-2 px-3"
                                        value={formData.passwordConfirm}
                                        onChange={handleChange}
                                    />
                                    <FontAwesomeIcon
                                        icon={showConfirmPassword ? faEyeSlash : faEye}
                                        onClick={handleToggleConfirmPassword}
                                        className="position-absolute top-50 end-0 translate-middle-y me-3 text-secondary"
                                        style={{ cursor: "pointer", width: "15px", height: "15px" }}
                                    />
                                </div>
                                {errors.passwordConfirm && <div className="text-danger small mt-1">{errors.passwordConfirm}</div>}
                            </div>
                        </div>
                        <div className="col-12 col-md-5">
                            <div className="mb-4 d-flex flex-column">
                                <label htmlFor="inputName" className="form-label">
                                    Name
                                </label>
                                <input
                                    id="inputName"
                                    name="name"
                                    type="text"
                                    placeholder="Enter your name..."
                                    style={{ backgroundColor: "#e9ecef" }}
                                    className="form-control py-2 px-3"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                {errors.name && <div className="text-danger small mt-1">{errors.name}</div>}
                            </div>
                            <div className="mb-4 d-flex flex-column">
                                <label htmlFor="inputPhone" className="form-label">
                                    Phone
                                </label>
                                <input
                                    id="inputPhone"
                                    name="phone"
                                    type="text"
                                    placeholder="Enter your phone..."
                                    style={{ backgroundColor: "#e9ecef" }}
                                    className="form-control py-2 px-3"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                                {errors.phone && <div className="text-danger small mt-1">{errors.phone}</div>}
                            </div>
                            <div className="d-flex gap-3">
                                <span>Gender :</span>
                                <div className="form-check d-flex flex-column align-items-center m-0">
                                    <input
                                        type="radio"
                                        name="gender"
                                        id="male"
                                        style={{
                                            width: "18px",
                                            height: "18px",
                                            accentColor: "#6200ee",
                                            cursor: "pointer",
                                        }}
                                        checked={formData.gender === true}
                                        onChange={() => handleGenderChange(true)}
                                    />
                                    <label htmlFor="male">Male</label>
                                </div>
                                <div className="form-check d-flex flex-column align-items-center m-0">
                                    <input
                                        type="radio"
                                        name="gender"
                                        id="female"
                                        style={{
                                            width: "18px",
                                            height: "18px",
                                            accentColor: "#6200ee",
                                            cursor: "pointer",
                                        }}
                                        checked={formData.gender === false}
                                        onChange={() => handleGenderChange(false)}
                                    />
                                    <label htmlFor="female">Female</label>
                                </div>
                            </div>
                            <button className="mt-5 btn px-4 py-2 text-white" style={{ backgroundColor: "#6200ee" }}>
                                SUBMIT
                            </button>
                        </div>
                    </div>
                </form>
                {submitStatus === "success" && (
                    <div className="text-center mt-5 text-success fs-5 fw-medium">
                        <span>
                            Đăng kí thành công! Đăng nhập{" "}
                            <NavLink to="/login" className="text-primary fw-bold text-decoration-underline">
                                Tại đây
                            </NavLink>
                        </span>
                    </div>
                )}

                {submitStatus === "error" && (
                    <div className="text-center mt-5 text-danger fs-5 fw-medium">
                        <span>Đăng kí thất bại! Có thể Email đã tồn tại!</span>
                    </div>
                )}
                {isAccount && (
                    <div className="text-center mt-5 fs-5 fw-medium">
                        <span>
                            Đã có tài khoản! Đăng nhập{" "}
                            <NavLink to="/login" className="text-primary fw-bold text-decoration-underline">
                                Tại đây
                            </NavLink>
                        </span>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Register;
