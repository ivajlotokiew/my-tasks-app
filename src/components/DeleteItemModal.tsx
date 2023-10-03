import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import styles from './TaskModal.module.css'
import { Task, fetchTasks } from '../features/tasks/tasksSlice';
import { useDispatch } from 'react-redux'
import { Directory } from '../features/directories/directoriesSlice';
import { deleteDirectoryAction } from '../features/directories/directoriesSlice';
import { deleteTaskAction } from '../features/tasks/tasksSlice'
import CustomButton from './common/CustomButton/CustomButton';

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
]


Modal.setAppElement('#root');

interface Props {
  item: Task | Directory,
  modalIsOpen: boolean,
  setIsOpen: (modalIsOpen: boolean) => void,
  itemName: string,
  description: string,
  stateTasks?: string
}

function DeleteItemModal({ modalIsOpen, setIsOpen, description, item, itemName, stateTasks }: Props) {
  const dispatch = useDispatch()
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    setIsOpen(modalIsOpen)
  }, [modalIsOpen, setIsOpen])

  const closeModal = () => {
    setError(null)
    setIsOpen(false);
  }

  const handleDeleteData = async (event: any) => {
    event.preventDefault()
    try {
      if (itemName === 'directory') await dispatch(deleteDirectoryAction(item)).unwrap()
      if (itemName === 'task') {
        const state = stateTasksObj.find((st: any) => st.value.includes(stateTasks))?.label
        await dispatch(deleteTaskAction(item)).unwrap()
        dispatch(fetchTasks({
          ...(state && { [state]: true })
        })).unwrap()
      }
    } catch (error) {
      console.error('The item failed to delete, please try again later.')
    }
    closeModal()
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Modal"
        overlayClassName={styles.Overlay}
      >
        <h4>{description}</h4>

        {error && <span style={{ color: "red" }}>{error}</span>}
        <CustomButton onClick={handleDeleteData}>Delete</CustomButton>
      </Modal>
    </>
  );
}

export default DeleteItemModal;
