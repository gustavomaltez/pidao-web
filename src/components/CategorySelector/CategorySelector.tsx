import { Button } from '@components';


// Types -----------------------------------------------------------------------

type Category = {
  id: string;
  name: string;
};

interface CategoryItemProps {
  category: Category;
  isSelected: boolean;
  onClick: () => void;
}

interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: Category;
  onCategoryClick: (category: Category) => void;
}

// Component -------------------------------------------------------------------

export function CategorySelector(props: CategorySelectorProps): JSX.Element {
  return (
    <div className="flex flex-row gap-2 w-min">
      {props.categories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          isSelected={category.id === props.selectedCategory.id}
          onClick={() => props.onCategoryClick(category)}
        />
      ))}
    </div>
  );
}

// Sub-components --------------------------------------------------------------

function CategoryItem(props: CategoryItemProps): JSX.Element {
  return (
    <Button
      theme={props.isSelected ? 'primary' : 'secondary'}
      label={props.category.name}
      onClick={props.onClick}
    />
  );
}