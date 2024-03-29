import "./Counts.scss"
import { FaPeopleLine } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { MdCoPresent } from "react-icons/md";

const Counts = () => {
  return (
    <div className="counts">
        <div className="total">
            <div className="total1" id="id1">
            <FaPeopleLine />
            <div className="number">50</div>
            <div className="describe">Total Employees</div>
            </div>                            
        </div>
        <div className="total">
            <div className="total1" id="id2">
            <FaRegClock />
            <div className="number">20</div>
            <div className="describe">Day Shift Emps</div>                
            </div>
        </div>
        <div className="total">
            <div className="total1" id="id3">
            <FaClock />
            <div className="number">30</div>
            <div className="describe">Night Shift Emps</div>                
            </div>
        </div>
        <div className="total">
            <div className="total1" id="id4">
            <MdCoPresent />
            <div className="number">15</div>
            <div className="describe">Present Employees</div>                
            </div>
        </div>
    </div>
  )
}

export default Counts