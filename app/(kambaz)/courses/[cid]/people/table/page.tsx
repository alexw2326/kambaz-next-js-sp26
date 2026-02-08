import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
export default function PeopleTable() {
 return (
  <div id="wd-people-table">
   <Table striped>
    <thead>
     <tr><th>Name</th><th>Login ID</th><th>Section</th><th>Role</th><th>Last Activity</th><th>Total Activity</th></tr>
    </thead>
    <tbody>
     <tr><td className="wd-full-name text-nowrap">
            <FaUserCircle className="me-2 fs-1 text-secondary" />
            <span className="wd-first-name">Tony</span>{" "}
            <span className="wd-last-name">Stark</span></td>
        <td className="wd-login-id">001234561S</td>
        <td className="wd-section">S101</td>
        <td className="wd-role">STUDENT</td>
        <td className="wd-last-activity">2020-10-01</td>
        <td className="wd-total-activity">10:21:32</td></tr>
        <tr><td className="wd-full-name text-nowrap">
            <FaUserCircle className="me-2 fs-1 text-secondary" />
            <span className="wd-first-name">Harry</span>{" "}
            <span className="wd-last-name">Potter</span></td>
        <td className="wd-login-id">001234561H</td>
        <td className="wd-section">S101</td>
        <td className="wd-role">STUDENT</td>
        <td className="wd-last-activity">2020-10-01</td>
        <td className="wd-total-activity">10:21:32</td></tr>
        <tr><td className="wd-full-name text-nowrap">
            <FaUserCircle className="me-2 fs-1 text-secondary" />
            <span className="wd-first-name">Luke</span>{" "}
            <span className="wd-last-name">Skywalker</span></td>
        <td className="wd-login-id">001234561J</td>
        <td className="wd-section">S101</td>
        <td className="wd-role">STUDENT</td>
        <td className="wd-last-activity">2020-10-01</td>
        <td className="wd-total-activity">10:21:32</td></tr>
        <tr><td className="wd-full-name text-nowrap">
            <FaUserCircle className="me-2 fs-1 text-secondary" />
            <span className="wd-first-name">Bilbo</span>{" "}
            <span className="wd-last-name">Baggins</span></td>
        <td className="wd-login-id">001234561A</td>
        <td className="wd-section">S101</td>
        <td className="wd-role">STUDENT</td>
        <td className="wd-last-activity">2020-10-01</td>
        <td className="wd-total-activity">10:21:32</td></tr>
    </tbody>
   </Table>
  </div> 
);}