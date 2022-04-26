import "./Modal.css";

const Modal = (props) => {
  return (
    <div
      id="myModal"
      className={props.toggleFlag === false ? "modal close" : "modal open"}
    >
      <div className="modal-content">
        <span onClick={props.toggleHandler} className="close-btn">
          &times;
        </span>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
