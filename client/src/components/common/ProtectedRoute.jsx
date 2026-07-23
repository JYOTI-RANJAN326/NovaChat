import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useSelector(
    (state) => state.auth
  );

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#020817] text-white">
        Loading...
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;