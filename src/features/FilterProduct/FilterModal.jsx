import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/Fragments/Modal";
import { resetFilter, setSortBy } from "./filterSlice";
import { FaChevronLeft } from "react-icons/fa";
import Button from "../../components/Elements/Button";
import { useState } from "react";

const FilterModal = ({ handleModalFilterSearch }) => {
  const dispatch = useDispatch();
  const { sortBy } = useSelector((state) => state.filter.filters);
  const [sortFilter, setSortFilter] = useState(sortBy);

  const handleResetFilter = () => {
    dispatch(resetFilter());
  };

  const handleSubmitFilter = () => {
    dispatch(setSortBy(sortFilter));
    handleModalFilterSearch();
  };

  const handleSortFilter = (sort) => {
    setSortFilter(sort);
  };

  return (
    <Modal onClick={handleModalFilterSearch}>
      <div className="w-full lg:w-[500px] relative">
        <div className="px-5 max-h-[64vh] md:max-h-[80vh]">
          <div className="h-full py-8">
            <div className="absolute top-2 left-0 right-0">
              <h5 className="text-center text-pink-600 font-bold">Filters</h5>
            </div>
            <div className="absolute top-2 left-2 z-[101]">
              <Button
                type="button"
                aria-label="Close Filter"
                classname="w-7 h-7 bg-pink-100 rounded-md flex items-center justify-center hover:bg-gray-200 transition duration-100 ease-in-out"
                onClick={handleModalFilterSearch}
              >
                <FaChevronLeft size={20} className="text-pink-600" />
              </Button>
            </div>
            <div className="absolute top-2 right-3 z-[101]">
              <Button
                type="button"
                aria-label="Reset Filter"
                classname="bg-pink-100 rounded-md px-2.5 py-1 text-gray-600 hover:bg-gray-200 transition duration-100 ease-in-out text-sm hover:text-gray-800"
                onClick={() => handleResetFilter()}
              >
                Reset
              </Button>
            </div>
            <h1 className="font-bold mb-4 mt-6">Sort by</h1>
            <div className="mb-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="">Relevance</p>
                <Button
                  type="button"
                  aria-label="Relevance"
                  classname={`w-6 h-6 rounded-full ${
                    sortFilter === "relevance"
                      ? "border-[8px] border-gray-800"
                      : "border-2 border-gray-400"
                  }`}
                  onClick={() => handleSortFilter("relevance")}
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="">Highest Price</p>
                <Button
                  type="button"
                  aria-label="Highest Price"
                  classname={`w-6 h-6 rounded-full ${
                    sortFilter === "highest"
                      ? "border-[8px] border-gray-800"
                      : "border-2 border-gray-400"
                  }`}
                  onClick={() => handleSortFilter("highest")}
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="">Lowest Price</p>
                <Button
                  type="button"
                  aria-label="Lowest Price"
                  classname={`w-6 h-6 rounded-full ${
                    sortFilter === "lowest"
                      ? "border-[8px] border-gray-800"
                      : "border-2 border-gray-400"
                  }`}
                  onClick={() => handleSortFilter("lowest")}
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="">A - Z</p>
                <Button
                  type="button"
                  aria-label="A - Z"
                  classname={`w-6 h-6 rounded-full ${
                    sortFilter === "a_z"
                      ? "border-[8px] border-gray-800"
                      : "border-2 border-gray-400"
                  }`}
                  onClick={() => handleSortFilter("a_z")}
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="">Z - A</p>
                <Button
                  type="button"
                  aria-label="Z - A"
                  classname={`w-6 h-6 rounded-full ${
                    sortFilter === "z_a"
                      ? "border-[8px] border-gray-800"
                      : "border-2 border-gray-400"
                  }`}
                  onClick={() => handleSortFilter("z_a")}
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="">Top Rated</p>
                <Button
                  type="button"
                  aria-label="Top Rated"
                  classname={`w-6 h-6 rounded-full ${
                    sortFilter === "top_rated"
                      ? "border-[8px] border-gray-800"
                      : "border-2 border-gray-400"
                  }`}
                  onClick={() => handleSortFilter("top_rated")}
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="">Most Reviewed</p>
                <Button
                  type="button"
                  aria-label="Most Reviewed"
                  classname={`w-6 h-6 rounded-full ${
                    sortFilter === "most_reviewed"
                      ? "border-[8px] border-gray-800"
                      : "border-2 border-gray-400"
                  }`}
                  onClick={() => handleSortFilter("most_reviewed")}
                />
              </div>
            </div>
            <Button
              type="button"
              aria-label="Show Results"
              classname="bg-pink-600 hover:bg-lime-600 text-white text-center text-sm leading-normal font-bold w-full px-6 py-3.5 rounded-xl transition duration-100 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed"
              onClick={handleSubmitFilter}
            >
              Show Results
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default FilterModal;
