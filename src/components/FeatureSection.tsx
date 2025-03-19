const FeatureSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Feature Lorem Ipsum</h2>
            <p className="text-muted">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
              atque corrupti quos dolores et quas molestias.
            </p>
          </div>
          <div className="flex justify-center">
            <img src="/placeholder.svg?height=400&width=400" alt="Feature" className="max-w-full rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeatureSection

