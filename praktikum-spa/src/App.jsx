import { useEffect } from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useParams,
  useSearchParams,
} from "react-router";
import { useFavorites } from "./favorites";

const PRODUCTS = [
  { id: 1, name: "Buku React", price: 85000, kategori: "Buku" },
  { id: 2, name: "Buku Web", price: 70000, kategori: "Buku" },
  { id: 3, name: "Keyboard", price: 150000, kategori: "Elektronik" },
  { id: 4, name: "Mouse", price: 90000, kategori: "Elektronik" },
];
const rupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

export default function App() {
  const { ids, storageError } = useFavorites();
  return (
    <>
      <header>
        <h1>Katalog Praktikum</h1>
        <nav aria-label="Navigasi utama">
          <NavLink to="/" end>
            Beranda
          </NavLink>
          <NavLink to="/products">Produk</NavLink>
          <NavLink to="/favorites">Favorit ({ids.length})</NavLink>
          <NavLink to="/about">Tentang</NavLink>
        </nav>
      </header>
      <main>
        {storageError && <p role="alert">{storageError}</p>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Catalog />} />
          <Route path="/products/:id" element={<Detail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

function usePageTitle(title) {
  useEffect(() => {
    const previous = document.title;
    document.title = title;
    return () => {
      document.title = previous;
    };
  }, [title]);
}

function Home() {
  usePageTitle("Beranda Katalog");
  return (
    <section>
      <h2>Selamat datang</h2>
      <p>Pilih produk dan simpan sebagai favorit.</p>
      <Link to="/products">Buka katalog</Link>
    </section>
  );
}

function ProductCard({ product }) {
  const { ids, toggle } = useFavorites();
  const selected = ids.includes(product.id);
  return (
    <article className="card">
      <h3>
        <Link to={`/products/${product.id}`}>{product.name}</Link>
      </h3>
      <p>{rupiah(product.price)}</p>
      <button
        type="button"
        aria-pressed={selected}
        onClick={() => toggle(product.id)}
      >
        {selected ? "Hapus favorit" : "Tambah favorit"}
      </button>
    </article>
  );
}

function Catalog() {
  usePageTitle("Katalog Produk");
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const category = params.get("category") ?? "";
  const filtered = PRODUCTS.filter((product) => {
    const cocokQuery = product.name.toLowerCase().includes(q.toLowerCase());
    const cocokKategori = category === "" || product.kategori === category;
    return cocokQuery && cocokKategori;
  });

  function updateQuery(key, value, replace = true) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace });
  }

  return (
    <section>
      <h2>Produk</h2>
      <label htmlFor="search">Cari produk</label>
      <input
        id="search"
        value={q}
        onChange={(event) => updateQuery("q", event.target.value)}
        placeholder="Contoh Buku"
      />
      <button type="button" onClick={() => updateQuery("q", "", false)}>
        Reset pencarian
      </button>
      <p>{filtered.length} produk ditemukan</p>
      <label htmlFor="category">Pilih kategori</label>

      <select
        id="category"
        value={category}
        onChange={(event) => updateQuery("category", event.target.value, false)}
      >
        <option value="">Semua kategori</option>
        <option value="Buku">Buku</option>
        <option value="Aksesori">Aksesori</option>
        <option value="Elektronik">Elektronik</option>
      </select>
      <div className="grid">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filtered.length === 0 && <p>Produk tidak ditemukan.</p>}
    </section>
  );
}

function Detail() {
  const { id } = useParams();
  const product = PRODUCTS.find((item) => String(item.id) === id);
  usePageTitle(product ? product.name : "Produk tidak ditemukan");
  return (
    <section>
      <h2>Detail produk</h2>
      {product ? (
        <ProductCard product={product} />
      ) : (
        <p>ID produk tidak tersedia.</p>
      )}
      <Link to="/products">Kembali ke katalog</Link>
    </section>
  );
}

function Favorites() {
  usePageTitle("Produk Favorit");
  const { ids, clearAll } = useFavorites();
  const selected = PRODUCTS.filter((item) => ids.includes(item.id));
  return (
    <section>
      <h2>Produk favorit</h2>
      {ids.length > 0 && (
        <button type="button" onClick={clearAll}>
          Hapus semua favorit
        </button>
      )}
      <div className="grid">
        {selected.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {selected.length === 0 && <p>Belum ada produk favorit.</p>}
    </section>
  );
}

function NotFound() {
  usePageTitle("Halaman tidak ditemukan");
  return (
    <section>
      <h2>Halaman tidak ditemukan</h2>
      <Link to="/">Kembali ke beranda</Link>
    </section>
  );
}

function About() {
  usePageTitle("Tentang Aplikasi");

  return (
    <section>
      <h2>Tentang Aplikasi</h2>

      <p>
        Aplikasi ini merupakan praktikum React mengenai useEffect, Custom Hook,
        Context API, dan React Router.
      </p>

      <p>
        Tujuan aplikasi ini adalah memahami pengelolaan state, penyimpanan data,
        dan navigasi dalam Single Page Application.
      </p>
    </section>
  );
}
