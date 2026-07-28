export default function LecturerAnalytics() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Lecturer Analytics Dashboard</h1>

      <section>
        <h2>Mission Completion</h2>
        <div id="mission-chart"></div>
      </section>

      <section>
        <h2>Most Failed Questions</h2>
        <div id="failed-questions-chart"></div>
      </section>

      <section>
        <h2>Student Progress</h2>
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Completed</th>
              <th>XP</th>
              <th>Last Active</th>
            </tr>
          </thead>
        </table>
      </section>
    </div>
  );
}
