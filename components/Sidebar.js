import Image from "next/image";
import useKiosco from "../hooks/useKiosco";
import Categoria from "./Categoria";

const Sidebar = () => {
  
  const { categorias } = useKiosco();
  
  return (
    <>
      <Image src="/assets/img/logo.svg" alt="Logo" width={300} height={100} />
      <nav className="mt-4">
        {categorias.map(categoria => (
          <Categoria key={categoria.id} categoria={categoria} />
        ))}
      </nav>
    </>
  )
}

export default Sidebar