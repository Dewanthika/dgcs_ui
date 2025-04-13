import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Hero = () => {
  const { isAuth } = useAuth();
  return (
    <section
      className="bg-secondary text-black py-16 md:py-24 bg-cover bg-center h-[400px]"
      style={{ backgroundImage: "url('/HeroImage1.webp')" }}
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          {!isAuth && (
            <Link
              to="/signup"
              className="btn btn-primary bg-black text-white py-2 px-5"
            >
              SIGN-UP
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
