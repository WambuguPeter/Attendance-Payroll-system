import Joi from "joi";

const employeeSchema = Joi.object({
    FirstName: Joi.string().required(),
    LastName: Joi.string().required(),
    Location: Joi.string().required(),
    BirthDate: Joi.date().required(),
    Contact: Joi.string().pattern(/^\d{10}$/).required(),
    Gender: Joi.string().required(),
    admin: Joi.boolean().required(),
    PositionID: Joi.number().required(),
    ScheduleID: Joi.number().required(),
    PhotoURL: Joi.string().uri(), 
    Email: Joi.string().email().max(255).required(),
    Password: Joi.string().min(6).max(255).required(),
    BankName: Joi.string().required(),
    BankBranch: Joi.string().required(),
    AccountNumber: Joi.string().required(),
    Bio: Joi.string().required(),
  });
  
  // Function to validate new employee data
  export const validateNewEmployee = (newEmployee) => {
    return employeeSchema.validate(newEmployee);
    
  };
  



export const userLoginvalidator = (user) => {
    const userValidatorSchema = Joi.object({
        Email: Joi.string().email().max(255).required(),
        Password: Joi.string().min(6).max(255).required(),
    });
    return userValidatorSchema.validate(user);
};