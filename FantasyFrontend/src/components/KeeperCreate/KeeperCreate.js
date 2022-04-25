import KeeperCreateModal from "../KeeperCreateModal/KeeperCreateModal";
import "./KeeperCreate.css";
import { useState } from "react";

const KeeperCreate = () => {
  const [toggleFlag, setToggleFlag] = useState(false);
  const handleButtonClick = () => {
    document.getElementById("form").reset();
    toggleFlag === false ? setToggleFlag(true) : setToggleFlag(false);
  };

  return (
    <>
      <div>
        <KeeperCreateModal
          toggleFlag={toggleFlag}
          toggleHandler={handleButtonClick}
        />
        <button className="btn-add" onClick={handleButtonClick}>
          &#43;
        </button>
      </div>
    </>
  );
};

export default KeeperCreate;
