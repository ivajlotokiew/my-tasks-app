import Modal from 'react-modal';
import { useEffect } from 'react';
import styles from './TasksModal.module.css'

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
  modalIsOpen: boolean;
  setIsOpen: (modalIsOpen: boolean) => void;
  nameForm: string;
  children: JSX.Element;
}

function TasksModal({ children, modalIsOpen, setIsOpen, nameForm }: Props) {
  let subtitle: any;

  useEffect(() => {
    setIsOpen(modalIsOpen)
  }, [modalIsOpen, setIsOpen])

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#eee';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      {children}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >

        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{nameForm}</h2>
        <img src='/close-white.svg'
          className={styles.closeIcon}
          role="button"
          alt='Close modal icon'
          width="25"
          onClick={closeModal}
          style={{ cursor: "pointer", marginLeft: "10px" }} />
        <form className={styles.modalWrapper}>
          <label htmlFor="title">Tittle</label>
          <input type="text" id="title" name="title" placeholder="Title..." />

          <label htmlFor="taskDate">Date</label>
          <input type="date" id="taskDate" name="taskDate"></input>

          <label htmlFor="description">Description (optional)</label>
          <input type="text" id="description" name="description" placeholder="Description..." style={{ marginBottom: '20px' }} />

          <label className={styles.container}>Mark as important
            <input type="checkbox" />
            <span className={styles.checkmark}></span>
          </label>
          <label className={styles.container}>Mark as completed
            <input type="checkbox" />
            <span className={styles.checkmark}></span>
          </label>
          <input type="submit" value="Submit"></input>
        </form>
      </Modal>
    </>
  );
}

export default TasksModal;