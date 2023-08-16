import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { Heading } from "@/components/ui/heading";

//ISSUE: Params no storeId
interface DashboardPageProps {
  params: { storeId: string }
};

const DashboardPage: React.FC<DashboardPageProps> = async ({
  params
}) => {

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId
    }
  });


  return(
    <div className = "p-5">
      <Heading
      title = "Active Store: "
      description = {store?.name} />
    </div>
  );
}

export default DashboardPage;