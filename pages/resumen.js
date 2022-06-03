import Layout from "../layout/Layout";
import useKiosco from "../hooks/useKiosco";
import ResumenProducto from "../components/ResumenProducto";
import { formatMoney } from "../helpers";


export default function Resumen() {
  
  const {pedido, total} = useKiosco();
  
  return (
    <Layout pagina="Resumen">
      <h1 className="text-4xl font-black">Resumen</h1>
      <p className="text-2xl my-10">Revisa tu Pedido</p>
      
      { pedido.length === 0 ? (
          <p className="text-center text-2xl my-10">No hay productos en el pedido</p>
        ) : (
          
            pedido.map(producto => (
              <ResumenProducto 
                key={producto.id}
                producto={producto}
              />
            ))
          
        )
      }
      <h2 className="text-2xl my-10">Total a Pagar: <span className="font-bold">{formatMoney(total)}</span></h2>
    </Layout>
  )
}
