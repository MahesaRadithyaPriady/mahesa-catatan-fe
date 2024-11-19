import Btn from "../components/btn";
import { useNavigate } from "react-router-dom";

const BtnPrimaryEye = ({ id, singleAction }) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.stopPropagation();
    navigate("/user/view-catatan?id=" + id);
  };

  return (
    <>
      <Btn
        typeBtn="primary"
        onclickHandler={handleClick}
        singleAction={singleAction}
      >
        <i className="fa fa-eye fa-lg"></i>
      </Btn>
    </>
  );
};

export default BtnPrimaryEye;
