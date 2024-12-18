import { useNavigate } from "react-router-dom";
import Btn from "../components/btn";

const BtnPenWarning = ({ id }) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.stopPropagation();
    navigate("/user/edit-catatan?id=" + id);
  };

  return (
    <Btn typeBtn="warning" onclickHandler={handleClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        />
      </svg>
    </Btn>
  );
};

export default BtnPenWarning;
