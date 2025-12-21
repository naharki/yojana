import { FileSpreadsheet } from "lucide-react"
export const FileExport = () =>{
    return (
        <button className="btn btn-sm btn-outline-success me-2 d-flex align-items-center"  title="Export to Excel">
            <FileSpreadsheet size={14} className="me-1" /> Export
          </button>
    )
}
