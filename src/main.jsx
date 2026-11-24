import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Route, Routes } from "react-router";
import Detail from "./pages/Detail.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.jsx";
import Index from "./pages/index.jsx";
import Cart from "./pages/Cart.jsx";
import Register from "./pages/Register.jsx";

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    </Provider>,
);
