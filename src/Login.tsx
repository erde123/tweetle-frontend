import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
    const { loginWithRedirect } = useAuth0();

  return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-black">
          <h2>Welcome to tweetle</h2>
          <h4>Login Screen</h4>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors" 
            onClick={() => loginWithRedirect()}
          >
            Log In
          </button>
        </div>
      </div>
  );
}

export default Login;