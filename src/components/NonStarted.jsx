import useWebinarsStore from "../store/webinarsStore";
import "../styles/students.scss";
import user3 from "../assets/user3.svg";
import ProgressBar from "./course/ProgressBar"; // Подключаем ProgressBar

const NotStarted = () => {
  const { webinars, getWorstStudents } = useWebinarsStore();
  const worstStudents = getWorstStudents();

  return (
    <div className="best-students">
      <h3 className="best-students__title">Не начали обучение</h3>
      
      {webinars?.map((webinar) => (
        <div key={webinar.id} className="best-students__webinar">
          <p className="webinar-title">Вебинар {webinar.date}</p>
          <div className="best-students__progress-bar">
            <ProgressBar progress={webinar.progress} />
          </div>
        </div>
      ))}

      {worstStudents?.map((student) => (
        <div key={student.id} className="best-students__item">
          <img src={user3} alt={student.name} className="not-started__avatar" />
          <div className="name_score">
            <p className="not-started__name">{student.name}</p>
            <p className="not-started__score">{student.score} монет</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotStarted;

