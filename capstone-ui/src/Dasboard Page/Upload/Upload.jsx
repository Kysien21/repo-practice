import DashboardHeader from "../Header and Sidebar/DashboardHeader";
import DashboardSidebar from "../Header and Sidebar/DashboardSidebar";
import UploadUI from "./UploadUI";

function Upload() {
  return(
    <main>
      <DashboardSidebar />
      <UploadUI />
      <DashboardHeader />
    </main>
  )
}

export default Upload;