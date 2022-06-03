import Image from "next/image";
import { formatMoney } from "../helpers";
import useKiosco from "../hooks/useKiosco";


const Producto = ({producto}) => {
  
  const {handleSetProducto, handleSetModal} = useKiosco();
  const { nombre, precio, imagen } = producto;
  
  return (
    <div className="border p-3">
      <Image 
        width={400}
        height={500}
        src={`/assets/img/${imagen}.jpg`}
        alt={`Imagen Platillo ${nombre}`}
      />
      <div className="p-5">
        <h3 className="text-2xl font-bold">{nombre}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">{formatMoney(precio)}</p>
      </div>
      
      <button
        className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
        type="button"
        onClick={() => {
          handleSetModal(true)
          handleSetProducto(producto)
        }}
      >
        Agregar
      </button>
      
    </div>
    
  )
}

export default Producto