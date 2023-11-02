import React, { useState } from 'react';

interface CategoryProps {
  categories: string[]; // An array of category names
  onCategorySelect: (category: string) => void;
}

const Categories: React.FC<CategoryProps> = ({ categories, onCategorySelect }) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    onCategorySelect(category);
  };

  return (
    <div>
      <h2>Select a category:</h2>
      <div className="category-buttons">
        {categories.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? 'selected' : ''}
            onClick={() => handleCategorySelect(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
