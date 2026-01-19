import Link from "next/link";
export default function CourseNavigation() {
  return (
    <div id="wd-courses-navigation">
      <Link href="/courses/1234/home">Home</Link><br/>
      <Link href="/courses/1234/modules">Modules
        </Link><br/>
      <Link href="/courses/1234/piazza">Piazza</Link><br/>
      <Link href="/courses/1234/zoom">Zoom</Link><br/>
      <Link href="/courses/1234/assignments">
          Assignments</Link><br/>
      <Link href="/courses/1234/quizzes">Quizzes
        </Link><br/>
      <Link href="/courses/1234/grades">Grades</Link><br/>
      <Link href="/courses/1234/people/table">People</Link><br/>
    </div>
  );}
