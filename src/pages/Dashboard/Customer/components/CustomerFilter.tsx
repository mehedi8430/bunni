import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface CustomerFilterProps {
  onFilterChange: (filters: {
    search?: string;
    name?: string;
    email?: string;
    company?: string;
  }) => void;
}

export function CustomerFilter({ onFilterChange }: CustomerFilterProps) {
  const [filters, setFilters] = useState({
    search: "",
    name: "",
    email: "",
    company: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSearch = () => {
    onFilterChange(filters);
  };

  const handleReset = () => {
    setFilters({ search: "", name: "", email: "", company: "" });
    onFilterChange({ search: "", name: "", email: "", company: "" });
  };

  return (
    <div className="mb-6 space-y-4 px-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div>
          <label
            htmlFor="search"
            className="text-foreground block text-sm font-medium"
          >
            Search
          </label>
          <Input
            id="search"
            value={filters.search}
            onChange={handleInputChange}
            placeholder="Search by name, email, or company"
            className="mt-1"
          />
        </div>
        <div>
          <label
            htmlFor="name"
            className="text-foreground block text-sm font-medium"
          >
            Name
          </label>
          <Input
            id="name"
            value={filters.name}
            onChange={handleInputChange}
            placeholder="Filter by name"
            className="mt-1"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="text-foreground block text-sm font-medium"
          >
            Email
          </label>
          <Input
            id="email"
            value={filters.email}
            onChange={handleInputChange}
            placeholder="Filter by email"
            className="mt-1"
          />
        </div>
        <div>
          <label
            htmlFor="company"
            className="text-foreground block text-sm font-medium"
          >
            Company
          </label>
          <Input
            id="company"
            value={filters.company}
            onChange={handleInputChange}
            placeholder="Filter by company"
            className="mt-1"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={handleSearch}>Apply Filters</Button>
        <Button variant="outline" onClick={handleReset}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
