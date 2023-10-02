import { Directory } from "../features/directories/directoriesSlice"

interface Props {
    directory: Directory
}

const DirectoryItem = ({ directory }: Props) => {

    return (
        <div>{directory.title}</div>
    )
}

export default DirectoryItem