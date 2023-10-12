import React, { useRef, useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';
import AllTodos from './AllTodos';
import { useDispatch } from 'react-redux';
import { addTodos } from '../redux/reducer';
import Form from 'react-bootstrap/Form';

const Todos = () => {
   const [show, setShow] = useState(false);
   const handleShow = () => setShow(true);
   const handleCloce = () => setShow(false)
   const titleInputRef = useRef(null);
   const todoInputRef = useRef(null);
   const [title, setTitle] = useState('');
   const [todo, setTodo] = useState('');
   const [completed, setCompleted] = useState(true);
   const dispatch = useDispatch();

   const addTodo = () => {
      if (todo.trim() !== '' && title.trim() !== '') {
         dispatch(addTodos({
            id: Math.floor(Math.random() * 1000 + Math.random() * 1000),
            title,
            item: todo,
            completed,
         }));
         setTitle('');
         setTodo('');
         titleInputRef.current.value = '';
         todoInputRef.current.value = '';
         setCompleted(true);
      }
   }

   const titleTodo = (e) => {
      setTitle(e.target.value);
   }
   const textTodo = (e) => {
      setTodo(e.target.value);
   };
   const toggleCompleted = () => {
      setCompleted(!completed);
   }

   return (
      <section className='add-todos'>
         <div className='d-flex justify-content-center align-items-center'>
            <button
               onClick={handleShow}
               type="button"
               className="m-30 btn btn-dark"
            >
               Додати ToDo
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ml-5 bi bi-cloud-plus" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z" />
                  <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
               </svg>
            </button>
         </div>
         <Modal show={show}>
            <ModalHeader>
               <ModalTitle>Нова задача</ModalTitle>
            </ModalHeader>
            <ModalBody>
               <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked={completed} onChange={toggleCompleted} />
                  <label className="form-check-label" for="flexCheckChecked">
                     Завдання не активне
                  </label>
               </div>
               <div className='d-flex justify-content-center align-items-center'>
                  <Form.Control
                     placeholder='Назва'
                     type="text"
                     id="inputPassword5"
                     aria-describedby="passwordHelpBlock"
                     className='mr-5'
                     ref={titleInputRef}
                     onChange={(e) => titleTodo(e)}
                  />
                  <Form.Control
                     placeholder='Текст'
                     type="text"
                     id="inputPassword5"
                     aria-describedby="passwordHelpBlock"
                     className='mr-5'
                     ref={todoInputRef}
                     onChange={(e) => textTodo(e)}
                  />
               </div>
            </ModalBody>
            <ModalFooter>
               <Button
                  onClick={handleCloce}
                  variant='secondary'
               >
                  Закрити
               </Button>
               <Button
                  onClick={addTodo}
                  variant='primary'
               >
                  Створити
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="16"
                     height="16"
                     fill="currentColor"
                     className="bi bi-file-earmark-plus"
                     viewBox="0 0 16 16"
                  >
                     <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z" />
                     <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                  </svg>
               </Button>
            </ModalFooter>
         </Modal>
         <AllTodos />
      </section>
   )
};

export default Todos;
