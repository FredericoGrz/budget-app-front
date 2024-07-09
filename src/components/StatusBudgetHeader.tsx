type StatusBudgetHeaderProps = {
  className?: string;
  budgetAvailable: number;
  spent: number;
};

export function StatusBudgetHeader({
  budgetAvailable,
  spent,
  className = "",
}: StatusBudgetHeaderProps) {
  return (
    <div className={className}>
      <div className="flex flex-col gap-1 text-green-700 hover:scale-110 transition-transform">
        <p className="text-lg">Budget Available</p>
        <p className="text-xl font-medium">${budgetAvailable.toFixed(2)}</p>
      </div>
      <div className="flex flex-col gap-1 text-yellow-700 hover:scale-110 transition-transform">
        <p className="text-lg">Spent</p>
        <p className="text-xl font-medium">${spent.toFixed(2)}</p>
      </div>
    </div>
  );
}
