import React, { useState, useEffect } from "react";
import Select from "./Select";
import type { Category } from "@/types/Category";

const CategoryFilter = () => {
  const [categories, setCategories] = useState<Partial<Category[]>>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data.categories);
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };
  return (
    <Select
      value={""}
      onChange={(e) => console.log(e.target.value)} // Handle value change;
      options={categories
        ?.filter((category) => category?.sp_id !== undefined && category?.category_name !== undefined)
        .map((category) => ({
          value: String(category!.sp_id),
          label: String(category!.category_name),
        }))
      }
      placeholder="Kateqoriya seç"
      className="max-w-32"
    />
  );
};

export default CategoryFilter;
