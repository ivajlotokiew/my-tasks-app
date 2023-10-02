import { Directory } from "../features/directories/directoriesSlice"

interface Props {
    directory: Directory
}


const DirectoryItem = ({ directory }: Props) => {
    return (
        <div>{directory.name}</div>
    )
}

export default DirectoryItem