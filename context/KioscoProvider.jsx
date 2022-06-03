import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'

const KioscoContext = createContext();

const KioscoProvider = ({ children }) => {
  
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});
  const [ producto, setProducto ] = useState({});
  const [ modal, setModal ] = useState(false);
  const [ pedido, setPedido ] = useState([]);
  const [ nombre, setNombre ] = useState('');
  const [ total, setTotal ] = useState(0);
  
  const router = useRouter();
  
  useEffect(() => {
    const obtenerCategorias = async () => {
      const {data} = await axios.get('/api/categorias');
      setCategorias(data);
    }
    obtenerCategorias();
  }, [])
  
  useEffect(() => {
    setCategoriaActual(categorias[0]);
  }, [categorias])
  
  const handleClickCategoria = (id) => {
    const categoria = categorias.filter(cat => cat.id === id);
    setCategoriaActual(categoria[0]);
    router.push("/");
  }  
  
  const handleSetProducto = (producto) => {
    setProducto(producto);
  }
  
  const handleSetModal = () => {
    setModal(!modal);
  }
  
  const handleAgregarPedido = ({categoriaId, ...producto}) => {
    if(pedido.some(productoState => productoState.id === producto.id)){
      const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState);
      setPedido(pedidoActualizado);
      toast.success(`${producto.nombre} guardado correctamente`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }else {
      setPedido([...pedido, producto]);
      toast.success(`${producto.nombre} agregado al pedido`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
      handleSetModal(false);
  }
  
  const handleCambiarCantidad = (id) => {
    const productoActualizado = pedido.filter(producto => producto.id === id);
    setProducto(productoActualizado[0]);
    setModal(!modal);
  }
  
  const handleEliminarProducto = (id) => {
    const productoActualizado = pedido.filter(producto => producto.id !== id);
    setPedido(productoActualizado);
    toast.error(`Producto eliminado del pedido`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  
  useEffect(() => {
    const totalPedido = pedido.reduce((total, producto) => total + (producto.cantidad * producto.precio), 0);
    setTotal(totalPedido);
  }, [pedido])
  
  const colocarOrden = async (e) => {
    e.preventDefault()
    
    try {
      await axios.post('/api/ordenes', {pedido, nombre, total, fecha:Date.now().toString()});
      
      //Resetear APP
      setCategoriaActual(categorias[0]);
      setPedido ([]);
      setNombre ('');
      setTotal (0);
      
      toast.success('Orden enviada correctamente')
      
      setTimeout(() => {
        router.push('/');
      }, 3000);
      
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <KioscoContext.Provider 
      value={{
        categorias,
        categoriaActual,
        producto,
        modal,
        pedido,
        nombre,
        total,
        setNombre,
        colocarOrden,
        handleClickCategoria,
        handleSetProducto,
        handleSetModal,
        handleAgregarPedido,
        handleCambiarCantidad,
        handleEliminarProducto
      }}
    >
      {children}
    </KioscoContext.Provider>
  )
}
export { KioscoProvider };
export default KioscoContext;