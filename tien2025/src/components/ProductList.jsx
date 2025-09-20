import React, { useEffect, useState } from "react";
import { productsAPI } from "../api";
import ModalConfirm from "./ModalConfirm";

export default function ProductList({ onEdit, refreshKey, onRequestRefresh }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    productsAPI.list()
      .then((data) => {
        setProducts(data);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [refreshKey]);

  async function confirmDelete(id) {
    try {
      await productsAPI.remove(id);
      onRequestRefresh();
    } catch (err) {
      alert("Error al eliminar: " + err.message);
    } finally {
      setToDelete(null);
    }
  }

  return (
    <div>
      <h2>Productos</h2>
      {loading && <p>Cargando...</p>}
      {error && <p className="error">{error}</p>}
      <table className="table">
        <thead><tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Acciones</th></tr></thead>
        <tbody>
          {products && products.length ? (
            products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>
                  <button onClick={() => onEdit(p)}>Editar</button>{" "}
                  <button onClick={() => setToDelete(p)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="4">No hay productos</td></tr>
          )}
        </tbody>
      </table>

      {toDelete && (
        <ModalConfirm
          title="Confirmar eliminación"
          message={`¿Eliminar producto "${toDelete.name}"?`}
          onConfirm={() => confirmDelete(toDelete.id)}
          onCancel={() => setToDelete(null)}
        />
      )}
    </div>
  );
}
