import { useState } from "react";
import { Search, X, ChevronDown } from "lucide-react";
import { logo } from "../assets/images";

export default function TodoNavbar() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(false); // 👈 dropdown state

  const filters = ["All", "Completed", "Incomplete"];

  return (
    <div className="bg-white shadow-sm rounded-lg p-3 flex justify-between items-center gap-4 mb-6">

      <div className="flex-shrink-0">
        <img src={logo} alt="Logo" className="h-10 w-12" />
      </div>

      <div className="flex flex-1 items-center bg-gray-50 border border-gray-200 max-w-lg rounded-lg px-3 py-2">
        <Search className="text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent outline-none px-2 text-sm text-gray-700"
        />
        {search && (
          <button onClick={() => setSearch("")}>
            <X className="text-gray-400 h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filter Dropdown */}
      <div className="relative">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-1 border border-gray-100 max-w-xl rounded-md px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          {filter}
          <ChevronDown
            className={`h-4 w-4 text-gray-500 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <div className="absolute right-0 mt-1 w-32 bg-white border rounded-md shadow-md z-10">
            {filters.map((f) => (
              <div
                key={f}
                onClick={() => {
                  setFilter(f);
                  setOpen(false); 
                }}
                className={`px-3 py-2 cursor-pointer text-sm hover:bg-gray-100 ${
                  filter === f ? "font-semibold text-blue-600" : ""
                }`}
              >
                {f}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
