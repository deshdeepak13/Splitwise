import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector((state) => ({
    isAuthenticated: state.auth?.isAuthenticated,
    isLoading: state.auth?.loading, // Optional: Handle loading state
  }));

  // 1️⃣ Handle loading state (if auth check is async)
  if (isLoading) {
    return <div>Loading...</div>; // Replace with a spinner
  }

  // 2️⃣ Redirect to Login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // Changed from "/auth" to "/login"
  }

  // 3️⃣ Render children (or <Outlet /> for nested routes)
  return children ? children : <Outlet />;
};

export default PrivateRoute;