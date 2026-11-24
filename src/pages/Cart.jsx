import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { removeFromCart, updateQuantity } from "../redux/slices/cartSlice";

const Cart = () => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);

    const handleUpdateQuantity = (id, selectedSize, amount) => {
        dispatch(
            updateQuantity({
                id: id,
                selectedSize: selectedSize,
                amount: amount,
            }),
        );
    };

    const handleRemoveItem = (id, selectedSize) => {
        dispatch(
            removeFromCart({
                id: id,
                selectedSize: selectedSize,
            }),
        );
    };

    return (
        <div>
            <Header />
            <div className="container min-vh-100">
                <h1 className="my-5">Cart</h1>
                <div className="mb-5" style={{ borderBottom: "2px solid #DEDDDC" }}></div>
                <div className="table-responsive rounded border shadow-sm">
                    <table className="table table-hover align-middle text-center mb-0">
                        <thead className="table table-light">
                            <tr className="text-nowrap">
                                <th scope="col" className="text-center" style={{ width: "44px" }}>
                                    <input type="checkbox" className="form-check-input" />
                                </th>
                                <th scope="col" style={{ width: "70px" }}>ID</th>
                                <th scope="col" style={{ width: "120px" }}>
                                    Image
                                </th>
                                <th scope="col" style={{ width: "300px" }}>Name</th>
                                <th scope="col" style={{ width: "100px" }}>Size</th>
                                <th scope="col" style={{ width: "120px" }}>Price</th>
                                <th scope="col"style={{ width: "220px" }}>Quantity</th>
                                <th scope="col"style={{ width: "120px" }}>Total</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {cartItems.length == 0 ? (
                                <tr>
                                    <td colSpan="9" className="text-center py-5 text-muted">
                                        Giỏ hàng của bạn đang trống.
                                    </td>
                                </tr>
                            ) : (
                                cartItems.map((item) => {
                                    return (
                                        <tr key={`${item.id}-${item.selectedSize}`} className="align-middle">
                                            <th scope="row" className="text-center">
                                                <input type="checkbox" className="form-check-input" />
                                            </th>
                                            <td>{item.id}</td>
                                            <td>
                                                <img className="w-100 rounded object-fit-cover border" src={item.image} alt={item.name} />
                                            </td>
                                            <td className="fw-semibold">{item.name}</td>
                                            <td className="fw-semibold">
                                                <span className="badge bg-light text-dark border" style={{ fontSize: "16px" }}>
                                                    {item.selectedSize}
                                                </span>
                                            </td>
                                            <td className="fw-semibold text-nowrap">{item.price}$</td>
                                            <td className="text-nowrap">
                                                <div className="d-inline-flex align-items-center gap-2">
                                                    <button
                                                        type="button"
                                                        className="btn btn-light border px-2 py-0 bg-primary fw-bold text-white"
                                                        onClick={() => handleUpdateQuantity(item.id, item.selectedSize, -1)}
                                                    >
                                                        -
                                                    </button>
                                                    <div className="px-3" style={{ backgroundColor: "#ccc" }}>
                                                        {item.quantity}
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="btn btn-light border px-2 py-0 bg-primary fw-bold text-white"
                                                        onClick={() => handleUpdateQuantity(item.id, item.selectedSize, +1)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="fw-bold text-primary text-nowrap">{(item.price * item.quantity).toLocaleString()}$</td>
                                            <td>
                                                <div className="d-inline-flex gap-2">
                                                    <button type="button" className="btn btn-sm btn-secondary">
                                                        EDIT
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => handleRemoveItem(item.id, item.selectedSize)}
                                                    >
                                                        DELETE
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="text-end my-3">
                    <button className="btn btn-warning">SUBMIT ORDER</button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Cart;
