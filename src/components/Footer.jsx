const Footer = () => {
    return (
        <>
            <div className="container">
                <div className="row gx-5">
                    <div className="col-4" style={{ borderRight: "1px solid #ccc" }}>
                        <h3 className="fs-2 fw-bolder">GET HELP</h3>
                        <div>
                            <p className="fs-5 fw-bold">Home</p>
                            <p className="fs-5 fw-bold">Nike</p>
                            <p className="fs-5 fw-bold">Adidas</p>
                            <p className="fs-5 fw-bold">Contact</p>
                        </div>
                    </div>
                    <div className="col-4" style={{ borderRight: "1px solid #ccc" }}>
                        <h3 className="fs-2 fw-bolder">SUPPORT</h3>
                        <div>
                            <p className="fs-5 fw-bold">About</p>
                            <p className="fs-5 fw-bold">Contact</p>
                            <p className="fs-5 fw-bold">Help</p>
                            <p className="fs-5 fw-bold">Phone</p>
                        </div>
                    </div>
                    <div className="col-4">
                        <h3 className="fs-2 fw-bolder">REGISTER</h3>
                        <div>
                            <p className="fs-5 fw-bold">Login</p>
                            <p className="fs-5 fw-bold">Register</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-secondary py-2 text-center"><p className="mt-2 text-dark fw-medium fs-5">© 2022 Cybersoft All Rights Reserved | Design Theme by Trương Tấn Khải.</p></div>
        </>
    );
};

export default Footer;
