import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./KeeperCreate.css";

const KeeperCreate = () => {
  const handleButtonClick = () => {
    console.log("button clicked!");
  };

  return (
    <>
      <div>
        <button className="btn-primary" onClick={handleButtonClick}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </>
  );
};

export default KeeperCreate;
