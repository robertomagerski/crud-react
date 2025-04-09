import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div>
        <header>
            <h1>Lista de Produtos</h1>
        </header>
        <Link to={"/lista"}>Clique aqui</Link>
    </div>
  )
}

export default Home