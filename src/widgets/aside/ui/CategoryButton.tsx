import { CategoryModel } from '@/entities/category/model/CategoryModel';
import { Button } from '@/shared/ui/Button';

interface CategoryButtonProps {
  category: CategoryModel;
  onPressed: (category: CategoryModel) => void;
}

function CategoryButton({ category, onPressed }: CategoryButtonProps) {
  return (
    <Button variant={'outline'} className='flex flex-row transition-all justify-between border-none gap-1.5 select-none cursor-pointer py-1 px-3' onClick={() => onPressed(category)}>
      <span className='text-sm font-medium'>{category.name}</span>
    </Button>
  )
}

export default CategoryButton