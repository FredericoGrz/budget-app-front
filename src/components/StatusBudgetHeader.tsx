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
  const formattedBudget = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(budgetAvailable);

  const formattedSpent = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(spent);
  return (
    <div className={className}>
      <div className="flex flex-col gap-1 text-green-700 hover:scale-110 transition-transform">
        <p className="text-lg">Budget Available</p>
        <p className="text-xl font-medium">{formattedBudget}</p>
      </div>
      <div className="flex flex-col gap-1 text-yellow-700 hover:scale-110 transition-transform">
        <p className="text-lg">Spent</p>
        <p className="text-xl font-medium">{formattedSpent}</p>
      </div>
    </div>
  );
}
