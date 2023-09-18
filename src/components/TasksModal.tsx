import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import styles from './TasksModal.module.css'
import { Task } from '../features/tasks/tasksSlice';

const customStyles = {
  content: {
    width: '30rem',
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    color: '#FFFFFF',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgb(15, 23, 42)',
    borderRadius: '10px'
  },
};

Modal.setAppElement('#root');

interface Props {
  task?: Task;
  modalIsOpen: boolean;
  setIsOpen: (modalIsOpen: boolean) => void;
  nameForm: string;
  children: JSX.Element;
}

function TasksModal({ children, modalIsOpen, setIsOpen, nameForm, task }: Props) {
  let subtitle: any;
  const [title, setTitle] = useState(() => task ? task.title : '')
  const [description, setDescription] = useState(() => task ? task.description : '')
  const [date, setDate] = useState(() => task ? task.created : (new Date()).toString())
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
    setIsOpen(false);
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
    console.log("Title", title)
    console.log("Desc", description)
    console.log("Date", date)
    console.log("Imp", importantChecked)
    console.log("comp", completedChecked)
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
            onChange={(event) => handleTitleInput(event)} />

          <label htmlFor="taskDate">Date</label>
          <input type="date"
            id="taskDate"
            name="taskDate"
            defaultValue={date}
            onChange={(event) => handleDateInput(event)} />

          <label htmlFor="description">Description (optional)</label>
          <input type="text" id="description"
            name="description"
            placeholder="Description..."
            style={{ marginBottom: '20px' }}
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
