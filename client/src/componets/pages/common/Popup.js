/* eslint-disable react-hooks/rules-of-hooks */
import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import Popup from "reactjs-popup";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import "./Popup.css";
import { useContext } from "react";
import { Globalcontext } from "../../../context/GlobalState";
import { postTodos } from "../../../services/todos";

function popup() {
  const { addNewtodo, error, setError } = useContext(Globalcontext);

  const [todoTitle, setTodoTitle] = useState("");
  const [todoDetail, setTodoDetail] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const newTodo = {
      title: todoTitle,
      detail: todoDetail,
    };
    const res = await postTodos(newTodo, token);
    if (res["request"]["status"] !== 200) {
      setError(res["request"]["response"]);
      return false;
    } else {
      addNewtodo(res.data);
      setTodoTitle("");
      setTodoDetail("");
      return true;
    }
  };

  return (
    <Popup trigger={<AddIcon />} modal nested className="modal">
      {(close) => (
        <div className="modal">
          <CloseIcon onClick={close} className="modal__close" />
          <div className="modal__content">
            <h2 className="modal__header"> Add Todo </h2>
            <p className="register__form--error">{error}</p>
            <TextField
              onChange={(e) => setTodoTitle(e.target.value)}
              value={todoTitle}
              label="Todo"
              variant="outlined"
              className="login__withSM--input"
            />
            <TextField
              onChange={(e) => setTodoDetail(e.target.value)}
              value={todoDetail}
              label="Detail"
              variant="outlined"
              className="login__withSM--input"
            />

            <Button
              variant="contained"
              onClick={(e) => {
                handleSubmit(e).then((e) => {
                  if (e === true) close();
                });
              }}
            >
              Add Todo
            </Button>
          </div>
          {/* <div className="actions">
          <button
            className="button"
            onClick={() => {
              console.log("modal closed ");
              close();
            }}
          >
            close modal
          </button>
        </div> */}
        </div>
      )}
    </Popup>
  );
}
export default popup;

// import React, { useState } from "react";
// // import Warper from "./Warper";
// import Popup from "reactjs-popup";
// //

// const ControlledPopup = () => {
//   const [open, setOpen] = useState(false);
//   const closeModal = () => setOpen(false);
//   return (
//     <div>
//       <button
//         type="button"
//         className="button"
//         onClick={() => setOpen((o) => !o)}
//       >
//         Controlled Popup
//       </button>
//       <Popup
//         open={open}
//         closeOnDocumentClick
//         onClose={closeModal}
//         style={{ width: "50%" }}
//       >
//         <div className="modal">
//           <a className="close" onClick={closeModal}>
//             &times;
//           </a>
//           Lorem ipsum dolor sit amet, consec
//         </div>
//       </Popup>
//     </div>
//   );
// };
// export default ControlledPopup;
