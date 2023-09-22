import { useState } from "react"
import { Task } from "../features/tasks/tasksSlice"
import TaskItem from "./TaskItem"
import styles from "./Tasks.module.css"
import TasksModal from "./TasksModal"
import CustomDropdown, { Option } from "./common/CustomDropdown/CustomDropdown"
import useSortTasks from "./hooks/useSortTasks"

const options: Option[] = [
    { label: "Sort by", disabled: true, value: "disabledOption" },
    { label: "Earlier first", value: 'time-first' },
    { label: "Later first", value: 'time-last' },
    { label: "Computed first", value: 'completed-first' },
    { label: "Uncomputed first", value: 'uncompleted-first' },
];

interface Props {
    tasks: Task[];
    stateTasksName: string;
}

const Tasks = ({ tasks, stateTasksName }: Props) => {
    const [showModal, setShowModal] = useState(false)
    const { setSortedBy, sortedTasks, sortedBy } = useSortTasks({ tasks });

    const handleShowModalEvent = () => {
        setShowModal(modal => !modal)
    }


    const handleSelectChange = (event: any) => {
        setSortedBy(event.target.value);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.heading}>
                <h2 style={{ color: '#FFFFFF', fontWeight: '500' }}>{stateTasksName} tasks ({tasks.length} {tasks.length !== 1 ? 'tasks' : 'task'})</h2>
                <CustomDropdown
                    options={options}
                    onChange={handleSelectChange}
                    selectedValue={sortedBy}
                />
            </div >
            <div className={styles.container}>
                {sortedTasks.map((task: Task) =>
                    <div className={styles.task} key={task.id}>
                        <TaskItem task={task} />
                    </div>)}
                <TasksModal nameForm="Add a task" modalIsOpen={showModal} setIsOpen={setShowModal}>
                    <div className={`${styles.task} ${styles.newTask}`} onClick={handleShowModalEvent}>
                        <>Add new task</>
                    </div>
                </TasksModal>
            </div>
        </div >
    )
}

export default Tasks