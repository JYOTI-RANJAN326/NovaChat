import AuthLayout from "../layouts/AuthLayout";
import LeftPanel from "../components/auth/LeftPanel";
import LoginCard from "../components/auth/LoginCard";

function Login() {
  return (
    <AuthLayout>

      <LeftPanel />

      <div className="xl:mt-15">
    <LoginCard />
</div>

    </AuthLayout>
  );
}

export default Login;