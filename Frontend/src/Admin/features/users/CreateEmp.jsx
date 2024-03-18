import { useAddEmployeeMutation } from "./UserApi";
import './CreateEmp.scss'

import { ErrorToast, ToasterContainer } from '../../Components/Toster';

const addEmployee = ({ onClose }) =>{

    const [addEmployee, {isLoading}] = useAddEmployeeMutation();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (e.target.value === "") {
          ErrorToast("Employee details cannot be blank");
        } else {
          createEvent({
            FirstName: e.target[0].value,
            LastName: e.target[1].value,
            Location: e.target[2].value,
            BirthDate: e.target[3].value,
            Contact: e.target[4].value,
            Gender: e.target[5].value,
            admin: e.target[6].value,
            PositionID: e.target[7].value,
            ScheduleID: e.target[8].value,
            PhotoURL: e.target[9].value,
            Email: e.target[10].value,
            Password: e.target[11].value,
            BankName: e.target[12].value,
            BankBranch: e.target[13].value,
            AccountNumber: e.target[14].value,
            Bio: e.target[15].value,
          });
          e.target.reset();
          setShowForm((prevState) => !prevState);
        }
      };

    return (
        <section className="addEmployee">
          <ToasterContainer />
          <h2>Add a New Employee</h2>
          <form onSubmit={handleSubmit} className="form">
            <label className="form-input" htmlFor="FirstName">
              FirstName:
              <input id="FirstName" name="FirstName" />
            </label>
            <label className="form-input" htmlFor="LastName">
              LastName:
              <input id="LastName" name="LastName" />
            </label>
            <label className="form-input" htmlFor="Location">
                Location:
              <input id="Location" name="Location" />
            </label>
            <label className="form-input" htmlFor="BirthDate">
              BirthDate:
              <input id="BirthDate" name="BirthDate" />
            </label>
            <label className="form-input" htmlFor="Contact">
                Contact:
              <input id="Contact" name="Contact" />
            </label>
            <label className="form-input" htmlFor="Gender">
                Gender:
              <input id="Gender" name="Gender" />
            </label>
            <label className="form-input" htmlFor="admin">
                admin:
              <input id="admin" name="admin" placeholder="1 for Admin & 0 for Empoyee" />
            </label>
            <label className="form-input" htmlFor="PositionID">
                PositionID:
              <input id="PositionID" name="PositionID" />
            </label>
            <label className="form-input" htmlFor="ScheduleID">
                ScheduleID:
              <input id="ScheduleID" name="ScheduleID" />
            </label>
            <label className="form-input" htmlFor="PhotoURL">
                PhotoURL:
              <input id="PhotoURL" name="PhotoURL" />
            </label>
            <label className="form-input" htmlFor="Email">
                Email:
              <input id="Email" name="Email" />
            </label>
            <label className="form-input" htmlFor="Password">
                Password:
              <input id="Password" name="Password" />
            </label>
            <label className="form-input" htmlFor="BankName">
                BankName:
              <input id="BankName" name="BankName" />
            </label>
            <label className="form-input" htmlFor="BankBranch">
                BankBranch:
              <input id="BankBranch" name="BankBranch" />
            </label>
            <label className="form-input" htmlFor="AccountNumber">
                AccountNumber:
              <input id="AccountNumber" name="AccountNumber" />
            </label>
            <label className="form-input" htmlFor="Bio">
                Bio:
              <input id="Bio" name="Bio" />
            </label>
            <button type="submit">{isLoading ? "Loading" : "Save"}</button>
          </form>
        </section>
      );


}

export default addEmployee;
