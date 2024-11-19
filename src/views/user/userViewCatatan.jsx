import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import UserLayouts from "../../layouts/user/userLayouts";
import ViewCatatan from "../../fragments/ViewCatatan";
const ViewCatatanPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  if (!id) {
    return <h1>Tidak Di Izinkan !</h1>;
  }

  return (
    <>
      <Helmet>
        <title>View Catatan</title>
      </Helmet>
      <UserLayouts>
        <ViewCatatan></ViewCatatan>
      </UserLayouts>
    </>
  );
};

export default ViewCatatanPage;
