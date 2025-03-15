import useWebinarsStore from "../store/webinarsStore";
import "../styles/students.scss";
import user1 from "../assets/user1.svg";
import ProgressBar from "./course/ProgressBar"; // Подключаем ProgressBar

const BestStudents = () => {
  const { webinars, getBestStudents } = useWebinarsStore();
  const bestStudents = getBestStudents();

  return (
    <div className="best-students">
      <h3 className="best-students__title">Лучшие студенты</h3>
      {webinars.map((webinar) => (
        <div key={webinar.id} className="best-students__webinar">
          <p className="webinar-title">Вебинар {webinar.date}</p>
          <div className="best-students__progress-bar">
            <ProgressBar progress={webinar.progress} />
          </div>
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