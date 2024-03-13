import ClipLoader from "react-spinners/ClipLoader";
import { useGetEmployeesQuery } from "./UserApi";


const EmployeesList = () => {
  const {
    data: employees,
    error,
    isLoading,
    isError,
    isFetching,
  } = useGetEmployeesQuery({ refetchOnReconnect: true });

  console.log(
    `Employees: ${employees}, Error: ${error}, isLoading: ${isLoading}, isError: ${isError}, isFetching: ${isFetching}`
  );

  if (isLoading || isFetching) {
    return <ClipLoader color="#000" loading={true} size={150} />;
  }
  if (error || isError || employees.length == 0) {
    console.log("Error caught or no Empoyee");
    return <div>Error: {"An error occurred. Couldn't fetch Enmployees. no employees"}</div>;
  } else {
    return (
      <div className="employeesList">
        <section className="employeescontainer">
          {employees &&
            [...employees]
              .sort((a, b) => b.EmployeeID - a.EmployeeID)}
        </section>
      </div>
    );
  }
};
export default EmployeesList;
