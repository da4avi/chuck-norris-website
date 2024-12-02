// components/General/Modal.js
import React from "react";
import "./styles/modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Se o modal não estiver aberto, retorna null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        {children} {/* O conteúdo do modal será passado como filhos */}
      </div>
    </div>
  );
};

export default Modal;
