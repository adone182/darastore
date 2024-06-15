import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BackdropOverlay = () => {
  return (
    <div
      role="presentation"
      className="fixed top-0 left-0 w-full h-screen z-20 bg-black bg-opacity-80"
    />
  );
};

const ModalOverlay = ({ children }) => {
  return (
    <div className="fixed top-10 left-0 right-0 bottom-0 mx-auto w-full lg:w-1/2 h-screen flex items-center justify-center z-30">
      <div className="bg-white px-4 rounded-lg shadow-lg text-gray-900 mx-2 my-2">
        {children}
        <ToastContainer />
      </div>
    </div>
  );
};

const portalElement = document.getElementById("modal");

const Modal = ({ children }) => {
  return (
    <>
      {ReactDOM.createPortal(<BackdropOverlay />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
