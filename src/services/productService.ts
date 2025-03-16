export interface Product {
    id: number
    title: string
    price: number
    originalPrice?: number
    discountPercentage?: number
    category: string
    productCode: string
    description: string
    imageUrl: string
    isNewArrival: boolean
    isHotProduct: boolean
    stock: number
  }
  
  // Get all products from localStorage
  export const getAllProducts = (): Product[] => {
    const products = localStorage.getItem("products")
    return products ? JSON.parse(products) : []
  }
  
  // Get new arrivals
  export const getNewArrivals = (): Product[] => {
    const products = getAllProducts()
    return products.filter((product) => product.isNewArrival)
  }
  
  // Get hot products
  export const getHotProducts = (): Product[] => {
    const products = getAllProducts()
    return products.filter((product) => product.isHotProduct)
  }
  
  // Get product by ID
  export const getProductById = (id: number): Product | undefined => {
    const products = getAllProducts()
    return products.find((product) => product.id === id)
  }
  
  // Add a new product
  export const addProduct = (product: Omit<Product, "id">): Product => {
    const products = getAllProducts()
    const newProduct = {
      ...product,
      id: Date.now(),
    }
  
    localStorage.setItem("products", JSON.stringify([...products, newProduct]))
    return newProduct
  }
  
  // Update a product
  export const updateProduct = (product: Product): Product => {
    const products = getAllProducts()
    const updatedProducts = products.map((p) => (p.id === product.id ? product : p))
  
    localStorage.setItem("products", JSON.stringify(updatedProducts))
    return product
  }
  
  // Delete a product
  export const deleteProduct = (id: number): void => {
    const products = getAllProducts()
    const updatedProducts = products.filter((p) => p.id !== id)
  
    localStorage.setItem("products", JSON.stringify(updatedProducts))
  }
  
  