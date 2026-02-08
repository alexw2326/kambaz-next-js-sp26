import Link from "next/link";
export default function CourseNavigation() {
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      <Link href="/courses/1234/home" className="list-group-item active border-0">Home</Link><br/>
      <Link href="/courses/1234/modules" className="list-group-item text-danger border-0">Modules
        </Link><br/>
      <Link href="/courses/1234/piazza" className="list-group-item text-danger border-0">Piazza</Link><br/>
      <Link href="/courses/1234/zoom" className="list-group-item text-danger border-0">Zoom</Link><br/>
      <Link href="/courses/1234/assignments" className="list-group-item text-danger border-0">
          Assignments</Link><br/>
      <Link href="/courses/1234/quizzes" className="list-group-item text-danger border-0">Quizzes
        </Link><br/>
      <Link href="/courses/1234/grades" className="list-group-item text-danger border-0">Grades</Link><br/>
      <Link href="/courses/1234/people/table" className="list-group-item text-danger border-0">People</Link><br/>
    </div>
  );}
