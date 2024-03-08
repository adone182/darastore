import { useState } from "react";
import Input from "../../components/Elements/Input/Input";
import { FaSearch } from "react-icons/fa";
import Button from "../../components/Elements/Button";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    onSearch(inputValue);
  };

  return (
    <div className="relative flex items-center justify-center">
      <Input
        type="search"
        name="search"
        value={query}
        onChange={handleChange}
        classname="border border-gray-200 bg-white h-12 px-4 lg:px-12 my-10 rounded-full text-sm focus:outline-none w-full"
        placeholder="Masukan keyword produk yang ingin dicari"
      />

      <Button type="button" classname="absolute top-15 end-5">
        <FaSearch size={22} color="blue" />
      </Button>
    </div>
  );
};

export default Search;
