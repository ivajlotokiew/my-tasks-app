import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import styles from './TasksModal.module.css'
import { Task, editTaskAction, addTaskAction } from '../features/tasks/tasksSlice';
import { useDispatch } from 'react-redux'
import { formatDate } from './utils/utils';
import CustomDropdown, { Option } from './common/CustomDropdown/CustomDropdown';

const customStyles = {
  content: {
    width: '25rem',
    top: '45%',
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
  dropdownOptions?: Option[];
}

const defaultDropdownOptions: Option[] = [
  { label: "Main", value: "main" },
]

function TasksModal({ children, modalIsOpen, setIsOpen, nameForm, task, dropdownOptions = defaultDropdownOptions }: Props) {
  let subtitle: any;
  const today = formatDate(new Date())
  const dispatch = useDispatch()
  const [title, setTitle] = useState(() => task ? task.title : '')
  const [description, setDescription] = useState(() => task ? task.description : '')
  const [date, setDate] = useState(() => task ? task.created : today)
  const [importantChecked, setImportantChecked] = useState(() => task ? task.important : false)
  const [completedChecked, setCompletedChecked] = useState(() => task ? task.completed : false)
  const [selectedOption, setSelectedOption] = useState("disabledOption");

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
    setDate(today)
    setImportantChecked(false)
    setCompletedChecked(false)
  }

  const handleSelectChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

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
      directoryId: 1,
      description,
      created: date,
      important: importantChecked,
      completed: completedChecked
    }

    if (task) {
      formTask.id = task.id
      dispatch(editTaskAction(formTask))
    } else {
      dispatch(addTaskAction(formTask))
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

        <h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{ fontWeight: '600' }}>{nameForm}</h2>
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
            value={title}
            onChange={(event) => handleTitleInput(event)}
            required />

          <label htmlFor="taskDate">Date</label>
          <input type="date"
            id="taskDate"
            name="taskDate"
            value={date}
            required
            min={today}
            onChange={(event) => handleDateInput(event)} />

          <label htmlFor="description">Description (optional)</label>
          <textarea id="description"
            name="description"
            placeholder="Description..."
            rows={4}
            value={description}
            onChange={(event) => handleDescriptionInput(event)} />

          <label>Select directory</label>
          <CustomDropdown options={dropdownOptions}
            selectedValue={selectedOption}
            onChange={handleSelectChange}
            style={{ width: '100%', padding: '12px 20px', margin: '8px 0 20px 0' }}
          />

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
