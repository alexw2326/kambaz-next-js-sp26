import { FaCircle } from "react-icons/fa6";
import { RiProhibited2Line } from "react-icons/ri";
export default function RedCheck() {
  return (
    <span className="me-1 position-relative">
      <RiProhibited2Line style={{ top: "2px" }} className="text-danger me-1 position-absolute fs-5" />
      <FaCircle className="text-white me-1 fs-6" />
    </span>
);}