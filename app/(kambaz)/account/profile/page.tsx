import { FormControl, FormSelect, Button } from "react-bootstrap";
export default function Profile() {
  return (
    <div>
      <h3>Profile</h3>
      <FormControl className="w-25 m-1" value="alice"></FormControl>
      <FormControl className="w-25 m-1" type="password" value="123"></FormControl>
      <FormControl className="w-25 m-1" placeholder="First Name" defaultValue="Alice"></FormControl>
      <FormControl className="w-25 m-1" placeholder="Last Name" defaultValue="Wonderland"></FormControl>
      <FormControl className="w-25 m-1" type="date" value="2000-01-01"></FormControl>
      <FormControl className="w-25 m-1" type="email" value="alice@wonderland.com"></FormControl>
      <FormSelect className="w-25 m-1">
        <option value="USER" defaultChecked>User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </FormSelect>
      <Button className="btn-danger m-1" href="signin">Sign out</Button>
    </div>
);}
