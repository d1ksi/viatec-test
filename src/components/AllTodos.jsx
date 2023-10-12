import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { completedTodos, removeTodos, updateTodos } from "../redux/reducer";

const AllTodos = () => {
   const dispatch = useDispatch();
   const todos = useSelector((state) => state.todos);
   const [filter, setFilter] = useState("all");
   const [editMode, setEditMode] = useState(null);
   const [editingTitle, setEditingTitle] = useState("");
   const [editingItem, setEditingItem] = useState("");
   const changeFocus = (id, title, item) => {
      setEditMode(id);
      setEditingTitle(title);
      setEditingItem(item);
   };
   const update = (id, e) => {
      if (e.which === 13) {
         dispatch(updateTodos({ id, title: editingTitle, item: editingItem }));
         setEditMode(null);
      }
   };
   const handleFilterClick = (filterType) => {
      setFilter(filterType);
   };
   const remove = (id) => {
      dispatch(removeTodos(id));
   };
   const completed = (id) => {
      dispatch(completedTodos(id));
   };
   const filteredTodos = todos.filter((item) => {
      if (filter === "completed") {
         return item.completed;
      }
      if (filter === "uncompleted") {
         return !item.completed;
      }
      return true;
   });
   const reversedTodos = [...filteredTodos].reverse();

   return (
      <section className="all-todos w-100 d-flex flex-column justify-content-center align-items-center">
         <div className="m-30 w-75 d-flex justify-content-between">
            <button
               type="button"
               style={{ width: "100px" }}
               className="btn btn-primary"
               onClick={() => handleFilterClick("all")}
            >
               Всі
            </button>
            <button
               type="button"
               style={{ width: "100px" }}
               className="btn btn-success"
               onClick={() => handleFilterClick("completed")}
            >
               Виконані
            </button>
            <button
               type="button"
               style={{ width: "100px" }}
               className="btn btn-danger"
               onClick={() => handleFilterClick("uncompleted")}
            >
               Не виконані
            </button>
         </div>
         <ul className="d-flex flex-column justify-content-center align-items-center p-0">
            {reversedTodos.map((item) => (
               <li key={item.id} className="d-flex mb-4">
                  {item.completed ? (
                     <button
                        onClick={() => completed(item.id)}
                        type="button"
                        className="mr-5 btn btn-danger d-flex justify-content-center align-items-center"
                     >
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="16"
                           height="16"
                           fill="currentColor"
                           className="bi bi-x-circle-fill"
                           viewBox="0 0 16 16"
                        >
                           <path
                              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
                           />
                        </svg>
                     </button>
                  ) : (
                     <button
                        onClick={() => completed(item.id)}
                        type="button"
                        className="mr-5 btn btn-success d-flex justify-content-center align-items-center"
                     >
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="16"
                           height="16"
                           fill="currentColor"
                           className="bi bi-check-circle-fill"
                           viewBox="0 0 16 16"
                        >
                           <path
                              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
                           />
                        </svg>
                     </button>
                  )}
                  <div>
                     <div>
                        <p>Назва</p>
                        <textarea
                           style={{ resize: "none", height: "80px" }}
                           disabled={editMode !== item.id}
                           defaultValue={item.title}
                           onChange={(e) => setEditingTitle(e.target.value)}
                           onKeyPress={(e) => update(item.id, e)}
                        />
                     </div>
                     <div>
                        <p>Текст</p>
                        <textarea
                           style={{ resize: "none", height: "80px" }}
                           disabled={editMode !== item.id}
                           defaultValue={item.item}
                           onChange={(e) => setEditingItem(e.target.value)}
                           onKeyPress={(e) => update(item.id, e)}
                        />
                     </div>
                  </div>
                  <div className="d-flex">
                     {editMode === item.id ? (
                        <button
                           onClick={() => update(item.id, { which: 13 })}
                           type="button"
                           className="m-5 btn btn-success d-flex justify-content-center align-items-center"
                        >
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-check-circle-fill"
                              viewBox="0 0 16 16"
                           >
                              <path
                                 d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
                              />
                           </svg>
                        </button>
                     ) : (
                        <button
                           onClick={() => changeFocus(item.id, item.title, item.item)}
                           type="button"
                           className="m-5 btn btn-primary d-flex justify-content-center align-items-center"
                        >
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-pen-fill"
                              viewBox="0 0 16 16"
                           >
                              <path
                                 d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44 1.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"
                              />
                           </svg>
                        </button>
                     )}
                     <button
                        onClick={() => remove(item.id)}
                        type="button"
                        className="btn btn-danger d-flex justify-content-center align-items-center"
                     >
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="16"
                           height="16"
                           fill="currentColor"
                           className="bi bi-trash-fill"
                           viewBox="0 0 16 16"
                        >
                           <path
                              d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM11 5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                        </svg>
                     </button>
                  </div>
               </li>
            ))}
         </ul>
      </section>
   );
};

export default AllTodos;
