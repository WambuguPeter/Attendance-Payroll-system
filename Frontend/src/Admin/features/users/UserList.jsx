import ClipLoader from "react-spinners/ClipLoader";
import { useGetEmployeesQuery } from "./UserApi";
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const EmployeesList = ({ onDeleteEmployee }) => {
  const {
    data: employees,
    error,
    isLoading,
    isError,
    isFetching,
  } = useGetEmployeesQuery();

  console.log(
    `Employees: ${employees}, Error: ${error}, isLoading: ${isLoading}, isError: ${isError}, isFetching: ${isFetching}`
  );

  if (isLoading || isFetching) {
    return <ClipLoader color="#000" loading={true} size={100} />;
  }

  if (error || isError || !employees || employees.length === 0) {
    console.log("Error caught or no Employee");
    return <div> <h2>No Employees at the moment</h2>  </div>;
  }

  return (
    <div className="employeesList">
      <section className="employeescontainer">
        {/* <h2>Employee List</h2> */}
        <table>
          <thead>
            <tr className="titles">
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Schedule</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr className="details" key={employee.EmployeeID}>
                <td>{employee.EmployeeID}</td>
                <td>{`${employee.FirstName} ${employee.LastName}`}</td>
                <td>{employee.Email}</td>
                <td>{employee.PositionID}</td>
                <td>{employee.ScheduleID}</td>
                <td>
                  <div className="action-icons">
                    <FaEye className="icon1" />
                    <FaEdit className="icon2" />
                    <FaTrash
                      className="icon3"
                      onClick={() => onDeleteEmployee(employee.EmployeeID)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default EmployeesList;
