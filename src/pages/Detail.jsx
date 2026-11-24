import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../redux/slices/productSlice";
import Footer from "../components/Footer";
import { addToCart } from "../redux/slices/cartSlice";

const DetailContent = () => {
    const { id } = useParams();
    const { productList } = useSelector((state) => state.product);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [selectedSize, setSelectedSize] = useState(null);
    const [sizeError, setSizeError] = useState(false);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const productDetail = productList.find((item) => String(item.id) === String(id));

    const handleDecrease = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    };

    const handleIncrease = () => {
        setQuantity((prev) => (prev < 99 ? prev + 1 : prev));
    };

    if (!productDetail) {
        return <div className="container py-5 text-center">Đang tải dữ liệu...</div>;
    }

    let relatedIds = [];
    try {
        relatedIds = Array.isArray(productDetail.relatedProducts) ? productDetail.relatedProducts : JSON.parse(productDetail.relatedProducts || "[]");
    } catch {
        relatedIds = [];
    }

    const relatedItems = productList.filter((item) => relatedIds.includes(Number(item.id)));

    const handleSelectSize = (size) => {
        setSelectedSize(size);
        setSizeError(false);
    };

    const handleAddToCart = () => {
      if(!selectedSize){
        setSizeError(true);
        return;
      }
      dispatch(addToCart({
        id: productDetail.id,
        image: productDetail.image,
        name:productDetail.name,
        price: productDetail.price,
        quantity: quantity,
        selectedSize: selectedSize,
      }))
    }

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-12 col-md-5">
                    <img src={productDetail?.image} alt={productDetail?.name} className="img-fluid bg-light" />
                </div>
                <div className="col-12 col-md-7">
                    <h2>{productDetail?.name}</h2>
                    <p>{productDetail?.description}</p>
                    <div className="content-detail">
                        <p className="fs-2" style={{ color: "#1ED90E" }}>
                            Available size
                        </p>
                        <div>
                            {productDetail?.sizes.map((item) => {
                                const isSelected = selectedSize === item;
                                return (
                                    <button
                                        key={item}
                                        className={`btn me-3 fs-5 fw-bold ${isSelected ? "btn-success" : "btn-light"}`}
                                        style={{ width: "50px", height: "50px" }}
                                        onClick={() => handleSelectSize(item)}
                                    >
                                        {item}
                                    </button>
                                );
                            })}
                            {sizeError && <div className="text-danger fs-5 mt-2">Please select your shoe size</div>}
                        </div>
                        <p className="my-3 text-danger fw-bold fs-1">{productDetail?.price}$</p>
                        <div className="fs-2">
                            <button
                                className="btn btn-secondary d-inline-flex align-items-center justify-content-center fs-2"
                                style={{ width: "50px", height: "50px" }}
                                onClick={handleDecrease}
                                disabled={quantity <= 1}
                            >
                                -
                            </button>
                            <span className="mx-3">{quantity}</span>
                            <button
                                className="btn btn-secondary d-inline-flex align-items-center justify-content-center fs-2"
                                style={{ width: "50px", height: "50px" }}
                                onClick={handleIncrease}
                                disabled={quantity >= 99}
                            >
                                +
                            </button>
                        </div>
                        <button className="btn-add-to-cart px-5 py-2 mt-3 fs-3" onClick={handleAddToCart}>Add to cart</button>
                    </div>
                </div>
            </div>
            <div className="my-5">
                <div className="my-5 text-center fs-1">-Relate Product-</div>
                <div className="row g-3 g-md-5">
                    {relatedItems.map((item) => {
                        return (
                            <div
                                key={item.id}
                                className="col-12 col-md-4"
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate(`/detail/${item.id}`)}
                            >
                                <div className="card bg-light">
                                    <img src={item.image} className="card-img-top w-100" alt={item.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="card-text">{item.shortDescription}</p>
                                        <div className="d-flex justify-content-center align-items-center bg-secondary">
                                            <button
                                                className="px-4 py-2 w-50 fs-5"
                                                style={{ backgroundColor: "#9DE167", borderRadius: "none", border: "none" }}
                                            >
                                                Buy now
                                            </button>
                                            <p className="w-50 text-center my-auto fs-5 text-white" style={{ color: "#087f5b" }}>
                                                {item.price}$
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const Detail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { productList } = useSelector((state) => state.product);

    useEffect(() => {
        if (productList.length === 0) {
            dispatch(fetchAllProducts());
        }
    }, [dispatch, productList.length]);

    return (
        <div>
            <Header />
            <DetailContent key={id} id={id} />
            <Footer />
        </div>
    );
};

export default Detail;
