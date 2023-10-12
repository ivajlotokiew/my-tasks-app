import Modal from 'react-modal';
import { useEffect } from 'react';
import { Task, fetchTasks } from '../features/tasks/tasksSlice';
import { useDispatch, useSelector } from 'react-redux'
import { Directory } from '../features/directories/directoriesSlice';
import { deleteDirectoryAction } from '../features/directories/directoriesSlice';
import { deleteTaskAction, showError, clearError } from '../features/tasks/tasksSlice'
import CustomButton from './common/CustomButton/CustomButton';
import styles from './DeleteItemModal.module.css'
import { useSearchParams } from 'react-router-dom';
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
  const [searchParams] = useSearchParams();
  const search = searchParams.get('q');
  const error = useSelector(showError);
  const navigate = useNavigate();

  useEffect(() => {
    setIsOpen(modalIsOpen)
  }, [modalIsOpen, setIsOpen])

  const closeModal = () => {
    if (error) dispatch(clearError())
    setIsOpen(false);
  }

  const handleDeleteData = async (event: any) => {
    event.preventDefault()
    try {
      if (itemName === 'directory') {
        try {
          await dispatch(deleteDirectoryAction(item)).unwrap()
          navigate('/')
        } catch (error) {
          console.error(error)
        }
      }
      if (itemName === 'task') {
        const state = stateTasksObj.find((st: any) => st.value.includes(stateTasks))?.label
        await dispatch(deleteTaskAction(item)).unwrap()
        dispatch(fetchTasks({
          ...(state && { [state]: true }),
          ...(search && { search })
        })).unwrap()
      }
    } catch (error) {
      console.error(error)
      return
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
        <img src='/close-white.svg'
          className={styles.closeIcon}
          role="button"
          alt='Close modal icon'
          onClick={closeModal}
          style={{ cursor: "pointer", marginLeft: "10px" }} />

        <h2 style={{ fontWeight: "500" }}>Are you sure?</h2>
        <h4 style={{ fontWeight: "400" }}>{description}</h4>

        {error && <span style={{ color: "red" }}>{error}</span>}
        <div className={styles.actionBtns}>
          <CustomButton style={{ backgroundColor: 'rgb(15, 23, 42)' }} onClick={closeModal}>Cancel</CustomButton>
          <CustomButton style={{ backgroundColor: 'rgb(91, 33, 182)' }} onClick={handleDeleteData}>Delete</CustomButton>
        </div>
      </Modal>
    </>
  );
}

export default DeleteItemModal;
