import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { useAppSelector } from "../../store/store";
import { getAllCartItems } from "../../store/selectors/cartSelector";

const Header = () => {
  const { isAuth, signout } = useAuth();
  const cart = useAppSelector(getAllCartItems);

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
                to=""
                onClick={signout}
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
            <span className="text-muted">({cart.length})</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
