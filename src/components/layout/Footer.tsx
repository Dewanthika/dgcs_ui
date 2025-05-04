import { Link } from "react-router-dom"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-6 bg-light border-t border-gray-200 mt-auto">
      <div className="container flex flex-col sm:flex-row justify-between items-center">
        <Link to="/" className="text-xl font-bold text-yellow-500">
        D G C S Holdings
        </Link>
        <p className="text-xs text-muted mt-2 sm:mt-0">DGCS Holdings © {currentYear}</p>
      </div>
    </footer>
  )
}

export default Footer

