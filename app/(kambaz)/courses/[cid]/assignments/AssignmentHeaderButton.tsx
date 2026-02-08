import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import { Badge } from "react-bootstrap";
export default function ModuleControlButtons() {
  return (
    <div className="float-end">
        <Badge bg="secondary" text="muted" pill className="border border-black">
            40% of total
        </Badge>
        <BsPlus className="fs-5 mx-2" />
        <IoEllipsisVertical className="fs-4" />
    </div> );}