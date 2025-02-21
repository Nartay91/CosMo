import useWebinarsStore from "../store/webinarsStore";
import "../styles/students.scss";
import user1 from "../assets/user1.svg";

const BestStudents = () => {
  const { webinars, updateProgress, getBestStudents } = useWebinarsStore();
  const bestStudents = getBestStudents();

  return (
    <div className="best-students">
      <h3 className="best-students__title">Лучшие студенты</h3>
      {webinars.map((webinar) => (
        <div key={webinar.id} className="best-students__webinar">
          <p>Вебинар {webinar.date}</p>
          <div className="best-students__progress-bar">
            <div
              className="best-students__progress"
              style={{ width: `${webinar.progress}%` }}
            />
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={webinar.progress}
            onChange={(e) => updateProgress(webinar.id, Number(e.target.value))}
          />
        </div>
      ))}
      
      {bestStudents.map((student) => (
        <div key={student.id} className="best-students__item">
          <img src={user1} alt={student.name} className="best-students__avatar" />
          <div>
            <p className="not-started__name">{student.name}</p>
            <p className="not-started__score">{student.score} монет</p>
          </div>
        </div>
      ))}

      
    </div>
  );
};

export default BestStudents;