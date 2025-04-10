import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

// const url = "http://localhost:3000/products"

const Home = () => {
  return (
    <div>
        <h1>Lista de Produtos</h1>
        <div>
            <Button> clique</Button>
        </div>
        <Link to={"/lista"}>Clique aqui</Link>
    </div>
  )
}

export default Home