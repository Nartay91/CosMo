import Chart from "../components/Chart"
import BestStudents from "../components/BestStudents";
import NonStarted from "../components/NonStarted";
import "../styles/home.scss";

const Home = () => {
    return (
        <div className="home__page">
            <Chart />
            <div className="rows__blocks">
            <BestStudents />
            <NonStarted />
            </div>
        </div>
    )
}

export default Home;