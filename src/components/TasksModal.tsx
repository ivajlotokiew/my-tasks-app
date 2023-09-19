import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import styles from './TasksModal.module.css'
import { Task, editTaskReducer, AddTaskReducer } from '../features/tasks/tasksSlice';
import { useDispatch } from 'react-redux'

const customStyles = {
  content: {
    width: '25rem',
    top: '35%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    color: '#FFFFFF',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgb(15, 23, 42)',
    borderRadius: '10px',
    border: 'none',
  },
};

Modal.setAppElement('#root');

interface Props {
  task?: Task;
  modalIsOpen: boolean;
  setIsOpen: (modalIsOpen: boolean) => void;
  nameForm: string;
  children?: JSX.Element;
}

function TasksModal({ children, modalIsOpen, setIsOpen, nameForm, task }: Props) {
  let subtitle: any;
  const todayDate = new Date();
  const day = todayDate.getDate().toString()
  const month = (todayDate.getMonth() + 1).toString()
  const year = todayDate.getFullYear().toString()
  const today = year + '-' + month.padStart(2, '0') + '-' + day.padStart(2, '0')
  const dispatch = useDispatch()
  const [title, setTitle] = useState(() => task ? task.title : '')
  const [description, setDescription] = useState(() => task ? task.description : '')
  const [date, setDate] = useState(() => task ? task.created : today)
  const [importantChecked, setImportantChecked] = useState(() => task ? task.important : false)
  const [completedChecked, setCompletedChecked] = useState(() => task ? task.completed : false)

  useEffect(() => {
    setIsOpen(modalIsOpen)
  }, [modalIsOpen, setIsOpen])

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#eee';
  }

  const closeModal = () => {
    if (!task) {
      clearFields()
    } else {
      setTitle(task.title)
      setDate(task.created)
      setDescription(task.description)
      setImportantChecked(task.important)
      setCompletedChecked(task.completed)
    }

    setIsOpen(false);
  }

  const clearFields = () => {
    setTitle('')
    setDescription('')
    setDate((new Date()).toString())
    setImportantChecked(false)
    setCompletedChecked(false)
  }

  const handleTitleInput = (event: any) => {
    setTitle(event.target.value)
  }

  const handleDescriptionInput = (event: any) => {
    setDescription(event.target.value)
  }

  const handleDateInput = (event: any) => {
    setDate(event.target.value)
  }

  const handleImportantChecked = (event: any) => {
    setImportantChecked(event.target.checked)
  }

  const handleCompletedChecked = (event: any) => {
    setCompletedChecked(event.target.checked)
  }

  const handleSubmitData = (event: any) => {
    event.preventDefault()
    const formTask: Task = {
      title,
      description,
      created: date,
      important: importantChecked,
      completed: completedChecked
    }

    if (task) {
      formTask.id = task.id
      dispatch(editTaskReducer(formTask))
    } else {
      dispatch(AddTaskReducer(formTask))
    }

    clearFields();
    closeModal()
  }

  return (
    <>
      {children}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Modal"
        overlayClassName={styles.Overlay}
      >

        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{nameForm}</h2>
        <img src='/close-white.svg'
          className={styles.closeIcon}
          role="button"
          alt='Close modal icon'
          width="25"
          onClick={closeModal}
          style={{ cursor: "pointer", marginLeft: "10px" }} />
        <form className={styles.modalWrapper} onSubmit={(event) => handleSubmitData(event)}>

          <label htmlFor="title">Tittle</label>
          <input type="text"
            id="title"
            name="title"
            placeholder="Title..."
            defaultValue={title}
            onChange={(event) => handleTitleInput(event)}
            required />

          <label htmlFor="taskDate">Date</label>
          <input type="date"
            id="taskDate"
            name="taskDate"
            defaultValue={date}
            min={today}
            onChange={(event) => handleDateInput(event)} />

          <label htmlFor="description">Description (optional)</label>
          <textarea id="description"
            name="description"
            placeholder="Description..."
            style={{ marginBottom: '20px' }}
            rows={4}
            defaultValue={description}
            onChange={(event) => handleDescriptionInput(event)} />

          <label className={styles.container}>Mark as important
            <input type="checkbox"
              defaultChecked={importantChecked}
              onChange={(event) => handleImportantChecked(event)} />
            <span className={styles.checkmark} />
          </label>

          <label className={styles.container}>Mark as completed
            <input type="checkbox"
              defaultChecked={completedChecked}
              onChange={(event) => handleCompletedChecked(event)} />
            <span className={styles.checkmark} />
          </label>

          <input type="submit" value="Submit"></input>

        </form>
      </Modal>
    </>
  );
}

export default TasksModal;
