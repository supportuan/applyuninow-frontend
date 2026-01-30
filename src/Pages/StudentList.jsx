import { StudentList } from "../components/StudentModule/StudentList";
import { Header } from "../components/StudentModule/Header";

const StudentsList = () => {
  return (
    <div className="p-4">
      <Header />
      <StudentList />
    </div>
  );
};
export default StudentsList