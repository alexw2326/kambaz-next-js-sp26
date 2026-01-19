import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/full-stack.jpg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div> <br />
        <div className="wd-dashboard-course"> <Link href="/courses/4700" className="wd-dashboard-course-link">
            <Image src="/images/networks.jpg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS4700 Network Fundamentals </h5>
              <p className="wd-dashboard-course-title">
                Network Fundamentals for Computer Science
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div> <br />
        <div className="wd-dashboard-course"> <Link href="/courses/3800" className="wd-dashboard-course-link">
            <Image src="/images/computation.png" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS3800 Theory </h5>
              <p className="wd-dashboard-course-title">
                Theory of Computation
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div> <br />
        <div className="wd-dashboard-course"> <Link href="/courses/2810" className="wd-dashboard-course-link">
            <Image src="/images/data-models.jpg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS2810 Math </h5>
              <p className="wd-dashboard-course-title">
                Mathematics of Data Models
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div> <br />
        <div className="wd-dashboard-course"> <Link href="/courses/4530" className="wd-dashboard-course-link">
            <Image src="/images/swe.avif" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS4530 SWE </h5>
              <p className="wd-dashboard-course-title">
                Fundamentals of Software Engineering
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div> <br />
        <div className="wd-dashboard-course"> <Link href="/courses/5200" className="wd-dashboard-course-link">
            <Image src="/images/database.avif" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS5200 Databases </h5>
              <p className="wd-dashboard-course-title">
                Database Management Systems
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div> <br />
        <div className="wd-dashboard-course"> <Link href="/courses/2550" className="wd-dashboard-course-link">
            <Image src="/images/cyber-security.jpg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CY2550 Cybersecurity </h5>
              <p className="wd-dashboard-course-title">
                Foundations of Cybersecurity
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div> <br />
      </div>
    </div>
);}
