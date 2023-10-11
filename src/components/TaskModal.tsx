import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import styles from './TaskModal.module.css'
import { Task, editTaskAction, addTaskAction, fetchTasks, fetchTasksByDirectory, showError, clearError } from '../features/tasks/tasksSlice';
import { Directory, showDirectories } from '../features/directories/directoriesSlice';
import { useDispatch, useSelector } from 'react-redux'
import { formatDate } from './utils/utils';
import CustomDropdown, { Option } from './common/CustomDropdown/CustomDropdown';
import { useNavigate } from 'react-router-dom';

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

const stateTasksObj = [
  { value: "Today's", label: 'today' },
  { value: "Completed", label: 'completed' },
  { value: "Uncompleted", label: 'uncompleted' },
  { value: "Important", label: 'important' },
  { value: "Directory", label: 'directory' },
]

Modal.setAppElement('#root');

interface Props {
  task?: Task,
  modalIsOpen: boolean,
  setIsOpen: (modalIsOpen: boolean) => void,
  nameForm: string,
  children?: JSX.Element,
  stateTasks?: string,
  directory?: Directory,
}

function TaskModal({ children, modalIsOpen, setIsOpen, nameForm, task, directory, stateTasks }: Props) {
  let subtitle: any;
  const today = formatDate(new Date())
  const dispatch = useDispatch()
  const directories = useSelector(showDirectories)
  const error = useSelector(showError)
  const [title, setTitle] = useState(() => task ? task.title : '')
  const [description, setDescription] = useState(() => task ? task.description : '')
  const [dateTask, setDateTask] = useState(() => task ? task.date : today)
  const [importantChecked, setImportantChecked] = useState(() => task ? task.important : false)
  const [completedChecked, setCompletedChecked] = useState(() => task ? task.completed : false)
  const [selectedOption, setSelectedOption] = useState(() => directories.find((dir: Directory) => dir.id === task?.directoryId)?.id);

  const navigate = useNavigate()
  const dropdownDirOptions: Option[] = directories.map((directory: Directory) => {
    return { value: directory.id, label: directory.title }
  })

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
      setDateTask(task.date)
      setDescription(task.description)
      setImportantChecked(task.important)
      setCompletedChecked(task.completed)
    }

    dispatch(clearError())
    setIsOpen(false);
  }

  const clearFields = () => {
    setTitle('')
    setDescription('')
    setDateTask(today)
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
    setDateTask(event.target.value)
  }

  const handleImportantChecked = (event: any) => {
    setImportantChecked(event.target.checked)
  }

  const handleCompletedChecked = (event: any) => {
    setCompletedChecked(event.target.checked)
  }

  const handleSubmitData = async (event: any) => {
    event.preventDefault()
    const formTask: Task = {
      title,
      directoryId: selectedOption || '1',
      description,
      date: dateTask,
      important: importantChecked,
      completed: completedChecked
    }

    if (task) {
      formTask.id = task.id
      const state = stateTasksObj.find((st: any) => st.value.includes(stateTasks))?.label
      try {
        await dispatch(editTaskAction(formTask)).unwrap()
        const getTasks = state === 'directory' ? fetchTasksByDirectory(directory?.id) : fetchTasks({
          ...(state && { [state]: true })
        })

        dispatch(getTasks).unwrap()
      } catch (err) {
        console.error(err)
        return
      }
    } else {
      try {
        await dispatch(addTaskAction(formTask)).unwrap()
      } catch (err) {
        console.error(err)
        return
      }

      navigate("/")
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
            value={dateTask}
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
          <CustomDropdown options={dropdownDirOptions}
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

          {error && <span style={{ color: "red" }}>{error}</span>}
          <input type="submit" value="Submit"></input>
        </form>
      </Modal>
    </>
  );
}

export default TaskModal;
