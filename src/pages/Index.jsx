import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import "../assets/styles.css";
import Footer from "../components/Footer";

const Index = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [indexCurrentProduct, setIndexCurrentProduct] = useState(0);
    const currentProduct = products[indexCurrentProduct];

    const handlePrev = () => {
        setIndexCurrentProduct((prev) => (prev === 0 ? products.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setIndexCurrentProduct((prev) => (prev === products.length - 1 ? 0 : prev + 1));
    };

    const itemsPerPage = 6;

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(products.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // window.scrollTo({ top: 500, behavior: "smooth" });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataProducts = await axios.get("https://apistore.cybersoft.edu.vn/api/Product");
                setProducts(dataProducts.data.content);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <Header />
            <section id="carousel" className="container position-relative px-5">
                <button
                    type="button"
                    onClick={handlePrev}
                    className="btn btn-dark position-absolute start-0 translate-middle-y shadow mx-md-3"
                    style={{ width: "45px", height: "45px", zIndex: 10, top: "50%" }}
                >
                    &#10094;
                </button>
                <div key={currentProduct?.id} className="d-flex flex-column flex-lg-row align-items-md-center carousel-animate">
                    <div className="row mx-3">
                        <div className="col-12 col-md-6">
                            <img src={currentProduct?.image} alt={currentProduct?.name} className="w-100" />
                        </div>
                        <div className="mx-auto my-auto col-12 col-md-6 ">
                            <h3 className="fs-1">{currentProduct?.name}</h3>
                            <p className="fs-5">{currentProduct?.shortDescription}</p>
                            <button className="px-4 py-2" style={{ backgroundColor: "#F8B653", borderRadius: "none", border: "none" }}>
                                Buy now
                            </button>
                        </div>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={handleNext}
                    className="btn btn-dark position-absolute end-0 translate-middle-y mx-md-3"
                    style={{ width: "45px", height: "45px", zIndex: 10, top: "50%" }}
                >
                    &#10095;
                </button>
            </section>
            <hr />
            <section id="products-list" className="container my-5">
                <h3 className="fs-1 my-4">List Products</h3>
                <div className="row g-3 g-md-5">
                    {currentProducts.map((item) => {
                        return (
                            <div className="col-12 col-md-4">
                                <div className="card">
                                    <img src={item.image} className="card-img-top w-100" alt={item.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="card-text">{item.shortDescription}</p>
                                        <a href="#" className="btn btn-primary">
                                            Go somewhere
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {totalPages > 1 && (
                    <nav className="d-flex justify-content-center mt-4">
                        <ul className="pagination">
                            {/* Nút Prev */}
                            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                    &laquo; Prev
                                </button>
                            </li>

                            {/* Tạo danh sách các nút số trang */}
                            <li className="page-item active">
                                <span className="page-link">
                                    {currentPage} / {totalPages}
                                </span>
                            </li>

                            {/* Nút Next */}
                            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                                    Next &raquo;
                                </button>
                            </li>
                        </ul>
                    </nav>
                )}
            </section>
            {/* <hr /> */}
            <Footer />
        </div>
    );
};

export default Index;
