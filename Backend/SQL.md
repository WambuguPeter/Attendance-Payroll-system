CREATE DATABASE Attendance_Payroll
use Attendance_Payroll

-- Create Schedules table
CREATE TABLE Schedules (
    ScheduleID INT PRIMARY KEY IDENTITY(1,1),
	ScheduleName VARCHAR(50),
    StartTime TIME,
    EndTime TIME,
	Hours INT
);

-- Create Positions table
CREATE TABLE Positions (
    PositionID INT PRIMARY KEY IDENTITY(1,1),
    Title VARCHAR(100),
	BasicSalary DECIMAL(10, 2),
	OvertimeRate DECIMAL(10, 2),
);

-- Create Employees table 
CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY IDENTITY(1,1),
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Location VARCHAR(255),
    BirthDate DATE,
    Contact VARCHAR(15),
    Gender VARCHAR(10),
    PositionID INT,
    ScheduleID INT,
    PhotoURL VARCHAR(999),
    Email VARCHAR(50),
	Password VARCHAR(50),
	BankName VARCHAR(50),
	BankBranch VARCHAR(50),
	AccountNumber VARCHAR(50),
	Bio VARCHAR(500),
	FOREIGN KEY (PositionID) REFERENCES Positions(PositionID),
	FOREIGN KEY (ScheduleID) REFERENCES Schedules(ScheduleID)
);

--DROP TABLE Employees;

-- Create Attendance table
CREATE TABLE Attendance (
    AttendanceID INT PRIMARY KEY IDENTITY(1,1),
    EmployeeID INT,
    Date DATE,
	ScheduleID INT,
    TimeIn TIME,
    TimeOut TIME,
	Hours INT,
    Minutes INT,
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID),
	FOREIGN KEY (ScheduleID) REFERENCES Schedules(ScheduleID)
);

-- Create Overtime table
CREATE TABLE Overtime (
    OvertimeID INT PRIMARY KEY IDENTITY(1,1),
    EmployeeID INT,
	AttendanceID INT,
    OvertimeHours INT,
    OvertimeMinutes INT,
	OvertimeEarnings DECIMAL(10, 2),
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID),
	FOREIGN KEY (AttendanceID) REFERENCES Attendance(AttendanceID)
);

-- Create Leave table
CREATE TABLE Leaves (
    LeavesID INT PRIMARY KEY IDENTITY(1,1),
    EmployeeID INT,
	Description VARCHAR(500),
    StartDate DATE,
	EndDate DATE,
	Approved BIT,
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
);
--DROP TABLE Leaves;

-- Create AdvanceCash table
CREATE TABLE AdvanceCash (
    AdvanceCashID INT PRIMARY KEY IDENTITY(1,1),
    EmployeeID INT,
    Date DATE,
	Description VARCHAR(500),
    Amount DECIMAL(10, 2),
	Approved BIT,
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
);

--DROP TABLE AdvanceCash;


-- Create Deductions table 
CREATE TABLE Deductions (
    DeductionID INT PRIMARY KEY IDENTITY(1,1),
    Description VARCHAR(255),
    Amount DECIMAL(10, 2)
);


-- Create Payroll table
CREATE TABLE Payroll (
    PayrollID INT PRIMARY KEY IDENTITY(1,1),
	PayrollDate DATE,
    EmployeeID INT,
    GrossPay DECIMAL(10, 2),
	DeductionID INT,
    TotalDeductions DECIMAL(10, 2),
    NetPay DECIMAL(10, 2),   
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID),
	FOREIGN KEY (DeductionID) REFERENCES Deductions(DeductionID)
);