/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { FaUserCircle, FaCheck } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import * as client from "../../../account/client";
import { FormControl } from "react-bootstrap";

export default function PeopleDetails({ uid, onClose }: { uid: string | null; onClose: () => void; }) {
    const deleteUser = async (uid: string) => {
        await client.deleteUser(uid);
        onClose();
    };
    const [user, setUser] = useState<any>({});
    const fetchUser = async () => {
        if (!uid) return;
        const user = await client.findUserById(uid);
        setUser(user);
    };
    const [name, setName] = useState("");
    const [editing, setEditing] = useState<"name" | "role" | "email" | null>(null);;
    const saveUser = async () => {
        const [firstName, lastName] = name.split(" ");
        const updatedUser = { ...user, firstName, lastName };
        await client.updateUser(updatedUser);
        setUser(updatedUser);
        setEditing(null);
        onClose();
    };
    const [role, setRole] = useState("");
    const saveRole = async () => {
        const updatedUser = { ...user, role: role };
        await client.updateUser(updatedUser);
        setUser(updatedUser);
        setEditing(null);
    };
    const [email, setEmail] = useState("");
    const saveEmail = async () => {
        const updatedUser = { ...user, email };
        await client.updateUser(updatedUser);
        setUser(updatedUser);
        setEditing(null);
    };
    useEffect(() => {
        if (uid) fetchUser();
    }, [uid]);
    if (!uid) return null;
    return (
        <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
            <button onClick={onClose} className="btn position-fixed end-0 top-0 wd-close-details">
                <IoCloseSharp className="fs-1" /> </button>
            <div className="text-center mt-2"> <FaUserCircle className="text-secondary me-2 fs-1" /> </div><hr />
            <div className="text-danger fs-4 wd-name">
                {editing !== "name" && (
                    <FaPencil onClick={() => setEditing("name")}
                        className="float-end fs-5 mt-2 wd-edit" /> )}
                {editing === "name" && (
                    <FaCheck onClick={() => saveUser()}
                        className="float-end fs-5 mt-2 me-2 wd-save" /> )}
                {editing !== "name" && (
                    <div className="wd-name"
                        onClick={() => setEditing("name")}>
                {user.firstName} {user.lastName} 
                </div>)}
                {user && editing === "name" && (
                    <FormControl className="w-50 wd-edit-name"
                        defaultValue={`${user.firstName} ${user.lastName}`}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") { saveUser(); }}}/>)}
            </div>
            <div className="wd-roles">
                {editing !== "role" && (
                    <FaPencil onClick={() => setEditing("role")}
                        className="float-end fs-6 mt-2 wd-edit" /> )}
                {editing === "role" && (
                    <FaCheck onClick={() => saveRole()}
                        className="float-end fs-6 mt-2 me-2 wd-save" /> )}
                {editing !== "role" && (
                    <div className="wd-role"
                        onClick={() => setEditing("role")}>
                <b>Roles: </b>
                {user.role}
                </div>)}
                {user && editing === "role" && (
                    <select defaultValue={user.role} onChange={(e) => setRole(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") { saveRole(); }}}
                            className="form-select float-start me-2 w-50 wd-select-role" >
                        <option value="STUDENT">Student</option>
                        <option value="TA">TA</option> <option value="FACULTY">Faculty</option>
                        <option value="ADMIN">Administrator</option>
                    </select>
                )}
            </div>
            <br />
            <div className="wd-email">
                {editing !== "email" && (
                    <FaPencil onClick={() => setEditing("email")}
                        className="float-end fs-6 mt-2 wd-edit" /> )}
                {editing === "email" && (
                    <FaCheck onClick={() => saveEmail()}
                        className="float-end fs-6 mt-2 me-2 wd-save" /> )}
                {editing !== "email" && (
                    <div className="wd-name"
                        onClick={() => setEditing("email")}>
                    <b>Email: </b>
                    {user.email}
                </div>)}
                {user && editing === "email" && (
                    <FormControl className="w-50 wd-edit-email"
                        type="email"
                        defaultValue={`${user.email}`}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") { saveEmail(); }}}/>)}
            </div>
            <b>Login ID:</b>        <span className="wd-login-id">      {user.loginId}      </span> <br />
            <b>Section:</b>         <span className="wd-section">       {user.section}      </span> <br />
            <b>Total Activity:</b>  <span className="wd-total-activity">{user.totalActivity}</span>
            <hr />
            <button onClick={() => deleteUser(uid)} className="btn btn-danger float-end wd-delete" > Delete </button>
            <button onClick={onClose}
                    className="btn btn-secondary float-end me-2 wd-cancel" > Cancel </button>
        </div>
    );
}
