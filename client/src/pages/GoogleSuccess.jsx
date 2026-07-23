import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/authSlice";

const GoogleSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      navigate("/login");
      return;
    }



const fetchUser = async () => {
  try {
    console.log("Token:", token);

    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    );

    console.log("Status:", response.status);

    const data = await response.json();

    console.log("Response:", data);

    if (data.success) {
      dispatch(
        setUser({
          user: data.data,
          token,
        })
      );

      localStorage.setItem("token", token);

      console.log("Navigating...");

      navigate("/chat");
    } else {
      console.log("Failed");

      navigate("/login");
    }

  } catch (err) {
    console.error(err);

    navigate("/login");
  }
}
fetchUser();
   }, [dispatch, navigate, searchParams]);

  return (
    <div className="flex h-screen items-center justify-center">
      <h2 className="text-xl font-semibold">
        Signing you in...
      </h2>
    </div>
  )
};


export default GoogleSuccess;