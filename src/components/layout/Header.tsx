import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import useAuth from "../../hooks/useAuth";

const Header = () => {
  const { isAuth } = useAuth();

  return (
    <header className="py-4 w-full m-auto">
      <div className="container flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          LOGO
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            to="/shop"
            className="text-sm hover:underline underline-offset-4"
          >
            Shop
          </Link>

          {isAuth ? (
            <>
              <Link
                to="/dashboard"
                className="text-sm hover:underline underline-offset-4"
              >
                Dashboard
              </Link>
              <Link
                to="/login"
                className="text-sm hover:underline underline-offset-4"
              >
                logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm hover:underline underline-offset-4"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm hover:underline underline-offset-4"
              >
                Register
              </Link>
            </>
          )}

          <Link to="/cart" className="flex items-center gap-1.5 text-sm">
            <ShoppingCart size={20} />
            <span>YOUR CART</span>
            <span className="text-muted">(2)</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
