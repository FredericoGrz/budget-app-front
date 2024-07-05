import { CardMoney } from "../components/CardMoney";
import { Header } from "../components/Header";

function Dashboard() {
  return (
    <div className="min-h-screen w-full bg-zinc-50 flex flex-col">
      <Header />
      <div className="flex-1 grid grid-cols-2 gap-2 p-4 lg:hidden">
        <CardMoney type="budget" className="col-span-1 h-32" />
        <CardMoney type="spent" className="col-span-1 h-32" />
      </div>
    </div>
  );
}

export default Dashboard;
