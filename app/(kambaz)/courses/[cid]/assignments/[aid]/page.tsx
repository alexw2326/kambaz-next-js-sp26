export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label> <br />
      <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />
      <textarea id="wd-description" defaultValue="The assignment is available online Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section Links to each of the lab assignments Link to the Kanbas application Links to all relevant source code repositories The Kanbas application should include a link to navigate back to the landing page.">
      </textarea>
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" defaultValue={100} />
          </td>
        </tr>
        <tr>
            <td align="right" valign="top">
            <label htmlFor="wd-assignment-group">Assignment Group</label>
          </td>
          <td>
            <select defaultValue="ASSIGNMENTS" id="wd-assignment-group">
              <option value="ASSIGNMENTS">Assignments</option>
              <option value="QUIZZES">Quizzes</option>
              <option value="PROJECTS">Projects</option>
            <option value="EXAMS">Exams</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade">Display Grade as</label>
          </td>
          <td>
            <select defaultValue="PERCENTAGE" id="wd-display-grade">
              <option value="PERCENTAGE">Percentage</option>
              <option value="NUMBER">Number</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select defaultValue="ONLINE" id="wd-submission-type">
              <option value="ONLINE">Online</option>
              <option value="PAPER">Paper</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="left">
            <label>Online Entry Options</label><br/>
            
            <input type="checkbox" name="check-online-options" id="wd-chkbox-text-entry"/>
            <label htmlFor="wd-chkbox-text-entry">Text Entry</label><br/>

            <input type="checkbox" name="check-online-options" id="wd-chkbox-website"/>
            <label htmlFor="wd-chkbox-website">Website URL</label><br/>

            <input type="checkbox" name="check-online-options" id="wd-chkbox-media"/>
            <label htmlFor="wd-chkbox-media">Media Recordings</label><br/>

            <input type="checkbox" name="check-online-options" id="wd-chkbox-annotation"/>
            <label htmlFor="wd-chkbox-annotation">Student Annotation</label><br/>

            <input type="checkbox" name="check-online-options" id="wd-chkbox-uploads"/>
            <label htmlFor="wd-chkbox-uploads">File Uploads</label><br/>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign-to">Assign to</label> <br />
          </td>
          <td>
            <input id="wd-assign-to" defaultValue="Everyone" />
          </td>
        </tr>
        <tr>
            <td>
                <label htmlFor="wd-text-fields-due"> Due </label>
                <input type="date"
                    defaultValue="2024-05-13"
                    id="wd-text-fields-due"/><br/>
            </td>
        </tr>
        <tr>
            <td>
                <label htmlFor="wd-text-fields-from"> Available from </label>
                <input type="date"
                    defaultValue="2024-05-06"
                    id="wd-text-fields-from"/><br/>
            </td>
            <td>
                <label htmlFor="wd-text-fields-until"> Until </label>
                <input type="date"
                    defaultValue="2024-05-20"
                    id="wd-text-fields-until"/><br/>
            </td>
        </tr>
      </table>
      <div>
        <button> Cancel </button>
        <button> Save </button>
      </div>
    </div>
);}
