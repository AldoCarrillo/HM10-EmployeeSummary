const Employee = require("./Employee");

class Manager extends Employee{
    constructor(name,id,email,office){
        super(name,id,email);
        this.role = "Manager";
        this.officeNumer = office;
        
    }

    getRole(){
        return this.role;
    }

    getOfficeNumber(){
        return this.officeNumer;
    }


}

module.exports = Manager;
