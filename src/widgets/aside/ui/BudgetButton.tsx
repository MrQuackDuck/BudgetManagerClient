import { BudgetModel } from '@/entities/budget/model/BudgetModel'
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/Button';

interface BudgetButtonProps {
  budget: BudgetModel;
  onPressed: (budget: BudgetModel) => void;
  isSelected?: boolean;
}

function BudgetButton({ budget, onPressed, isSelected }: BudgetButtonProps) {
  return (
    <Button variant={'outline'} className={cn('flex flex-row transition-all justify-start border-none gap-1.5 select-none cursor-pointer py-1 px-3', isSelected && "shadow" )} onClick={() => onPressed(budget)}>
      <span className='text-slate-500 font-semibold text-sm'>{budget.related_currency.symbol}</span>
      <span className='text-sm font-medium'>{budget.title}</span>
    </Button>
  )
}

export default BudgetButton