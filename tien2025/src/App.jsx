import React, { useState } from "react";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";

export default function App() {
  const [editing, setEditing] = useState(null); // producto a editar
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="container">
      <header>
        <h1>Tienda - CRUD (React)</h1>
      </header>

      <main>
        <section className="left">
          <ProductList
            onEdit={(p) => setEditing(p)}
            refreshKey={refreshKey}
            onRequestRefresh={() => setRefreshKey((k) => k + 1)}
          />
        </section>

        <section className="right">
          <ProductForm
            key={editing ? editing.id : "new"}
            editing={editing}
            onDone={() => {
              setEditing(null);
              setRefreshKey((k) => k + 1);
            }}
            onCancel={() => setEditing(null)}
          />
        </section>
      </main>
    </div>
  );
}
