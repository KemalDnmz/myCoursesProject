import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Courses from "./Courses";
import Loading from "./Loading";

function App() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const deleteCourse = (id) => {
    const afterDeletedCourses = courses.filter((course) => course.id !== id);
    setCourses(afterDeletedCourses);
  };

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get("  http://localhost:3004/courses");
      setCourses(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(true);
    }

    debugger;
  };
  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="App">
      {loading ? (
        <Loading />
      ) : (
        <>
          
          {courses.length === 0 ? (
            <div className="refreshDiv">
              <h2> You have deleted all of your courses !</h2>
              <button className="cardDeleteBtn" onClick={fetchCourses} >Refresh</button>
            </div>
          ) : (
            <Courses courses={courses} removeCourse={deleteCourse} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
