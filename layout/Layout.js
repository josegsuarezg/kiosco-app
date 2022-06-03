import Head from "next/head";
import Modal from 'react-modal';
import { ToastContainer } from 'react-toastify';
import useKiosco from "../hooks/useKiosco";
import Sidebar from "../components/Sidebar";
import ModalProducto from "../components/ModalProducto";
import Pasos from "../components/Pasos";

import 'react-toastify/dist/ReactToastify.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#__next');

export default function Layout({children, pagina}) {
  
  const { modal } = useKiosco();
  
  return (
    <>
      <Head>
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Kiosco Cafetería" />
        <title>Café - {pagina}</title>
      </Head>
      
      <div className="md:flex">
        <aside className="md:w-4/12 xl:w-1/4 2xl:w-1/5">
          <Sidebar />
        </aside>
        <main className="md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-scroll">
          <div className="p-10">
            <Pasos />
            {children}
          </div>
        </main>
      </div>
      
      {modal && (
        <Modal
          isOpen={modal}
          style={customStyles}
        >
          <ModalProducto />
        </Modal>
      )}
      
      <ToastContainer />
      
    </>
  )
}
