import React, { useEffect, useState } from "react";
import { productsAPI } from "../api";

export default function ProductForm({ editing, onDone, onCancel }) {
  const [form, setForm] = useState({ name: "", price: 0, description: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editing) {
      setForm({ ...editing });
    } else {
      setForm({ name: "", price: 0, description: "" });
    }
  }, [editing]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing && editing.id) {
        await productsAPI.update(editing.id, form);
      } else {
        await productsAPI.create(form);
      }
      setError("");
      onDone();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === "price" ? Number(value) : value }));
  }

  return (
    <div>
      <h2>{editing ? "Editar producto" : "Nuevo producto"}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input name="name" value={form.name} onChange={onChange} required />
        </div>

        <div>
          <label>Precio</label>
          <input name="price" type="number" value={form.price} onChange={onChange} required />
        </div>

        <div>
          <label>Descripción</label>
          <textarea name="description" value={form.description} onChange={onChange} />
        </div>

        <div className="buttons">
          <button type="submit" disabled={saving}>{saving ? "Guardando..." : "Guardar"}</button>
          {editing && <button type="button" onClick={onCancel}>Cancelar</button>}
        </div>
      </form>
    </div>
  );
}
