import { Link } from "react-router-dom"

const Hero = () => {
  return (
    <section className="bg-secondary text-white py-16 md:py-24">
      <div className="container text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">Build better fronted</h1>
          <p className="text-base md:text-lg">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
            atque corrupti quos dolores et quas molestias.
          </p>
          <div>
            <Link to="/signup" className="btn btn-primary">
              SIGN-UP
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

