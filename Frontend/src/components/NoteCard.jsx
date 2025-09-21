import { PenSquareIcon, Trash2Icon } from "lucide-react"
import {Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/api.js"
import toast from 'react-hot-toast'


const NoteCard = ({note,setNotes}) => {

    const handleDelete = async (e,id) => {
        e.preventDefault();

        if(!window.confirm("Are you Sure you want to delete this Note?")) return;

        try {
            await api.delete(`/notes/${id}`);
            setNotes((prev) => prev.filter(note => note._id !== id)); //delete the note from the UI without needing to refresh.
            toast.success("Note deleted Successfully!")
        } catch (error) {
            toast.error("Failed to Delete Note")
        }
    }

  return (
    <Link to= {`/notes/${note._id}`}
     className="card bg-base-100 hover:shadow-lg transition-all duration-200
    border-t-4 border-solid border-[#00FF9D]">

        <div className="card-body">

         
            <h3 className="card-title text-base-content">{note.title}</h3>   {/* THIS IS THE TITLE OF THE NOTE*/}
            <p className="text-base-content/70 line-clamp-3">{note.content}</p>  {/* THIS IS THE CONTENT OF THE NOTE*/}

            <div className="card-actions justify-between items-center mt-4">

                <span className="text-sm text-base-content/60">
                    {formatDate(new Date (note.createdAt))}                                {/* THIS IS THE TIME OF CREATION OF THE NOTE*/}
                </span>

                    <div className="flex items-center gap-1">
                        <PenSquareIcon className="size-4"/>         {/* THIS IS THE PEN ICON OF THE NOTE*/}

                        <button className="btn btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e,note._id)}>
                            <Trash2Icon className="size-4" />           {/* THIS IS THE DELETE ICON OF THE NOTE*/}
                        </button>

                    </div>

                
            </div>
        </div>

    </Link>

  )
}

export default NoteCard