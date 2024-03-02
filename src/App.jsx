import "./App.css";
import Navbar from "./components/Fragments/Navbar";
import ProductList from "./features/ProductList";

function App() {
  return (
    <>
      <Navbar logoName="DaraStore" />
      <main className="max-w-7xl mx-auto px-4">
        <ProductList />
      </main>
    </>
  );
}

export default App;
