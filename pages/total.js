import { useEffect, useCallback } from 'react';
import Layout from "../layout/Layout"
import useKiosco from '../hooks/useKiosco';
import { formatMoney } from '../helpers';

export default function Total() {
  
  const { pedido, nombre, total, setNombre, colocarOrden } = useKiosco();
  
  const comprobarPedido = useCallback(() => {
    return pedido.length === 0 || nombre === '' || nombre.length < 3;    
  },[pedido, nombre]);
  

  
  useEffect(() => {
    comprobarPedido();
  }, [pedido, nombre, comprobarPedido]);
  
  return (
    <Layout pagina="Total y Confirmar Pedido">
      <h1 className="text-4xl font-black">Total y Confirmar Pedido</h1>
      <p className="text-2xl my-10">Confirma tu Pedido a Continuación</p>
      
      <form
        onSubmit={colocarOrden}
      >
        <div>
          <label 
            htmlFor="nombre"
            className="block uppercase text-slate-800 text-xl font-bold"
          >
            Nombre
          </label>
          <input 
            type="text" 
            id="nombre"
            name="nombre"
            className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
          </div>
          
          <div className="mt-10">
            <p className="text-2xl">Total a pagar: {''} <span className="font-bold">{formatMoney(total)}</span></p>
          </div>
          
          <div className="mt-10">
            <input 
              type="submit"
              className={`${comprobarPedido() ? "bg-indigo-100" : "bg-indigo-400 cursor-pointer hover:bg-indigo-800" } w-full lg:w-auto px-5 py-2 rounded text-white font-bold text-center uppercase`}
              value="Confirmar Pedido"
              disabled={comprobarPedido()}
            />
          </div>
          
      </form>
      
    </Layout>
  )
}
