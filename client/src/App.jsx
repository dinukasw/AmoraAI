import {
    BrowserRouter,
    Routes,
    Route,
    Outlet,
    Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import AdminLogin from "./adminPages/AdminLogin";

// Admin Layout Component
// const AdminLayout = () => (
//     <div className="main">
//         <div className="menuContainer">
//             <Menu />
//         </div>
//         <div className="content-container">
//             <Header />
//             <Outlet />
//         </div>
//     </div>
// );

// Admin Private Route Component
const AdminPrivateRoute = () => {
    const { isAuthenticated } = useSelector((state) => state.admin);
    return isAuthenticated ? <Outlet /> : <Navigate to="/lab-login" />;
};

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />

                {/* Protected User Routes */}
                <Route element={<PrivateRoute />}>
                    {/* <Route path="/profile" element={<Profile />} /> */}
                </Route>

                {/* Admin Routes */}
                <Route path="/lab-login" element={<AdminLogin />} />
                <Route element={<AdminPrivateRoute />}>
                    {/* <Route path="/lab" element={<AdminLayout />}>
                        <Route index element={<h1>Admin Dashboard</h1>} />
                    </Route> */}
                </Route>

                {/* Catch-all Route */}
                <Route path="*" element={<h1>404 - Page Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    );
}
