import { useState } from "react"
import { Task } from "../features/tasks/tasksSlice"
import TaskItem from "./TaskItem"
import styles from "./Tasks.module.css"
import TasksModal from "./TasksModal"
import CustomDropdown, { Option } from "./common/CustomDropdown/CustomDropdown"

const options: Option[] = [
    { label: "Sort by", disabled: true, value: "disabledOption" },
    { label: "Earlier first", value: 1 },
    { label: "Later first", value: 2 },
    { label: "Computed first", value: 3 },
    { label: "Uncomputed first", value: 4 },
];

interface Props {
    tasks: Task[];
    stateTasksName: string;
}

const Tasks = ({ tasks, stateTasksName }: Props) => {
    const [showModal, setShowModal] = useState(false)
    const [selectedOption, setSelectedOption] = useState("disabledOption");

    const handleShowModalEvent = () => {
        setShowModal(modal => !modal)
    }


    const handleSelectChange = (event: any) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.heading}>
                <h2 style={{ color: '#FFFFFF', fontWeight: '500' }}>{stateTasksName} tasks ({tasks.length} {tasks.length !== 1 ? 'tasks' : 'task'})</h2>
                <CustomDropdown
                    options={options}
                    onChange={handleSelectChange}
                    selectedValue={selectedOption}
                />
            </div>
            <div className={styles.container}>
                {tasks.map((task: Task) =>
                    <div className={styles.task} key={task.id}>
                        <TaskItem task={task} />
                    </div>)}
                <TasksModal nameForm="Add a task" modalIsOpen={showModal} setIsOpen={setShowModal}>
                    <div className={`${styles.task} ${styles.newTask}`} onClick={handleShowModalEvent}>
                        <>Add new task</>
                    </div>
                </TasksModal>
            </div>
        </div>
    )
}

export default Tasks