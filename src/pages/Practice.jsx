import React from "react";

const Practice = () => {
    const Person = {
        firstName : "Shubham",
        lastName : "Harad",
        fullName : function(){
            return this.firstName +""+ this.lastName;

        }    
}
console.log(Person.fullName);
};

export default Practice;