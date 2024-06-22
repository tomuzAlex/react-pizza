import React from 'react';
// import useWhyDidYouUpdate from "ahooks/lib/useWhyDidYouUpdate";
// useWhyDidYouUpdate("Categories", { value, onChangeCategories });

type CategoriesProps = {
  value: number;
  onChangeCategories: (index: number) => void;
}

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC<CategoriesProps> = React.memo(({ value, onChangeCategories }) => {

  return (
    <div className="categories">
      <ul>
        {categories.map((categoriesName, index) => (
          <li
            key={index}
            onClick={() => onChangeCategories(index)}
            className={value === index ? 'active' : ''}
          >
            {categoriesName}
          </li>
        ))}
      </ul>
    </div>
  );
});
  

export default Categories;
