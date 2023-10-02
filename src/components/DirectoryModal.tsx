import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import styles from './DirectoryModal.module.css'
import { fetchDirectories, editDirectoryAction, addDirectoryAction } from '../features/directories/directoriesSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Directory } from '../features/directories/directoriesSlice';

const customStyles = {
  content: {
    width: '30rem',
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
  directory?: Directory,
  modalIsOpen: boolean,
  setIsOpen: (modalIsOpen: boolean) => void,
  nameForm: string,
}

function DirectoryModal({ directory, modalIsOpen, setIsOpen, nameForm }: Props) {
  let subtitle: any;
  const dispatch = useDispatch()
  const [title, setTitle] = useState(() => directory ? directory.title : '')
  const [error, setError] = useState<any>(null)
  const navigate = useNavigate()

  useEffect(() => {
    setIsOpen(modalIsOpen)
  }, [modalIsOpen, setIsOpen])

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#eee';
  }

  const closeModal = () => {
    if (!directory) {
      clearFields()
    } else {
      setTitle(directory.title)
    }

    setError(null)
    setIsOpen(false);
  }

  const clearFields = () => {
    setTitle('')
  }

  const handleTitleInput = (event: any) => {
    setTitle(event.target.value)
  }

  const handleSubmitData = async (event: any) => {
    event.preventDefault()
    const formDirectory: Directory = {
      title,
    }

    if (directory) {
      formDirectory.id = directory.id
      try {
        await dispatch(editDirectoryAction(formDirectory)).unwrap()
        dispatch(fetchDirectories()).unwrap()
      } catch (err) {
        setError(err);
        console.error(err);
        return
      }
    } else {
      await dispatch(addDirectoryAction(formDirectory))
      navigate("/")
    }

    clearFields();
    closeModal()
  }

  return (
    <>
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
          {error && <span style={{ color: "red" }}>{error}</span>}
          <input type="submit" value="Save"></input>
        </form>
      </Modal>
    </>
  );
}

export default DirectoryModal;
