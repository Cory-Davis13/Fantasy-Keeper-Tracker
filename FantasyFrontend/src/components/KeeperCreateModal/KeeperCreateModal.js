import { useState } from "react";
import "./KeeperCreateModal.css";

const KeeperCreateModal = (props) => {
  const [inputFilled, setInputFilled] = useState(false);

  const handleInputChange = (e) => {
    e.target.value !== "" ? setInputFilled(true) : setInputFilled(false);
  };

  function playerFormat() {
    const p = document.getElementById("player").value;
    return p.replace(/\s/g, "%20");
  }

  return (
    <div
      id="myModal"
      className={props.toggleFlag === false ? "modal close" : "modal open"}
    >
      <div className="modal-content">
        <span onClick={props.toggleHandler} className="close-btn">
          &times;
        </span>
        <form id="form" method="POST" action="/addPlayer">
          <span className="u-h1">Add a Keeper</span>
          <div className="form-field">
            <input
              className={
                inputFilled === true
                  ? "form-field-input form-field-filled"
                  : "form-field-input"
              }
              type="text"
              id="player-name"
              name="player"
              onChange={handleInputChange}
              required
            ></input>
            <label className="form-field-title" htmlFor="player-name">
              Player
            </label>
          </div>
          <div className="form-field">
            <input
              className={
                inputFilled === true
                  ? "form-field-input form-field-filled"
                  : "form-field-input"
              }
              type="text"
              id="manager-name"
              name="manager"
              onChange={handleInputChange}
              required
            ></input>
            <label className="form-field-title" htmlFor="manager-name">
              Manager
            </label>
          </div>
          <div className="form-field">
            <input
              className={
                inputFilled === true
                  ? "form-field-input form-field-filled"
                  : "form-field-input"
              }
              type="number"
              id="keeper-year"
              name="year"
              min="2020"
              max="2022"
              onChange={handleInputChange}
              required
            ></input>
            <label className="form-field-title" htmlFor="keeper-year">
              Year
            </label>
          </div>
          <div className="form-fields-columns">
            <div className="form-field form-field--half">
              <input
                className={
                  inputFilled === true
                    ? "form-field-input form-field-filled"
                    : "form-field-input"
                }
                type="number"
                id="draft-retain"
                name="retain"
                min="0"
                max="2"
                onChange={handleInputChange}
                required
              ></input>
              <label className="form-field-title" htmlFor="draft-retain">
                Retained
              </label>
            </div>
            <div className="form-field form-field--half">
              <input
                className={
                  inputFilled === true
                    ? "form-field-input form-field-filled"
                    : "form-field-input"
                }
                type="number"
                id="draft-remain"
                name="remain"
                min="0"
                max="2"
                onChange={handleInputChange}
                required
              ></input>
              <label className="form-field-title" htmlFor="draft-remain">
                Remaining
              </label>
            </div>
          </div>
          <button
            className="btn-primary"
            onSubmit={playerFormat}
            type="submit"
            id="btn-submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default KeeperCreateModal;
