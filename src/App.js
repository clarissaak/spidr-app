import React, {useState} from "react";
import "./App.css";
import Background from "./Background";
import spidr from "./spidr.png";

// custom input
function MyInput({label, id, value, onChange, placeholder = ""}) {
    return (
      <div className="MyInput">
        <label>{label}:
          <input type="text" id={id} value={value} onChange={onChange} placeholder={placeholder}/>
        </label>
      </div>
    )
}

function App() {
     // input array
     const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        phone: '',
        email: '',
        cost: '',
        pin: '',
    });

    // error messages for each field
    const [errors, setErrors] = useState({
        fname: '',
        lname: '',
        phone: '',
        email: '',
        cost: '',
        pin: '',
    });

    // updates form data if any changes are made before submitting
    const handleChange = (key) => (event) => {
        setFormData({ ...formData, [key]: event.target.value});
    };

    // prints data to console
    const onSubmit = (event) => {
        event.preventDefault();
        const newErrors = {};
        newErrors.fname = validateName(formData.fname, "First");
        newErrors.lname = validateName(formData.lname, "Last");
        newErrors.phone = validatePhone(formData.phone);
        newErrors.email = validateEmail(formData.email);
        newErrors.cost = validateCost(formData.cost);
        newErrors.pin = validatePin(formData.pin);
      
        setErrors(newErrors);
      
        if (!Object.values(newErrors).some((error) => error)) {
          console.log(formData);
        }
    };

    // regex validation functions for each input
    const validateName = (name, type) => {
        if (!name.trim()) 
            return `${type} name is required`;
        const valid = /^[a-zA-Z\s\-'.]+$/;
        if (!valid.test(name)) 
            return `Please enter a valid ${type.toLowerCase()} name.`;
        return '';
      };
      
    const validatePhone = (phone) => {
        if (!phone.trim()) 
            return 'Phone number is required';
        const valid = /^\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})$/;
        if (!valid.test(phone)) 
            return 'Please enter a valid phone number.';
        return '';
    };
      
    const validateEmail = (email) => {
        if (!email.trim()) 
            return 'Email is required';
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!valid.test(email)) 
            return 'Please enter a valid email address.';
        return '';
    };
      
    const validateCost = (cost) => {
        if (!cost.trim()) 
            return 'Cost is required';
        const numeric = /^\d+(\.\d+)?$/;
        if (!numeric.test(cost)) 
            return 'Please enter a valid cost.';
        return '';
    };
      
    const validatePin = (pin) => {
        if (!pin.trim()) 
            return 'PIN is required';

        const cleanPin = pin.replace(/-/g, '');
        if (!/^\d+$/.test(cleanPin))
            return 'Please enter a valid PIN';
        if (cleanPin.length !== 16) 
            return 'PIN must be exactly 16 digits long.';
        if (pin !== `${cleanPin.substring(0,4)}-${cleanPin.substring(4,8)}-${cleanPin.substring(8,12)}-${cleanPin.substring(12,16)}`)
            return 'PIN must be in the format XXXX-XXXX-XXXX-XXXX';
        return '';
    };


    return (
        <div className="App">
            <Background/>
            <header className="App-header">
                <img className="Spidr" src={spidr} alt="spidr"/>
            </header>
            <div className="FormContainer">
                <header className="Form-header">Please complete the following interest form: </header>
                <form className="Form" onSubmit={onSubmit}>
                    <MyInput label="First Name" id="fname" value={formData.fname} onChange={handleChange('fname')}/>
                    <div className="errorMessage"> {errors.fname}</div>
                    <MyInput label="Last Name" id="lname" value={formData.lname} onChange={handleChange('lname')} />
                    <div className="errorMessage"> {errors.lname}</div>
                    <MyInput label="Phone Number" id="phone" value={formData.phone} onChange={handleChange('phone')} />
                    <div className="errorMessage"> {errors.phone}</div>
                    <MyInput label="Email" id="email" value={formData.email} onChange={handleChange('email')} />
                    <div className="errorMessage"> {errors.email}</div>
                    <MyInput label="Guess our air fryer's cost" id="cost" value={formData.cost} onChange={handleChange('cost')} />
                    <div className="errorMessage"> {errors.cost}</div>
                    <MyInput label="Spidr PIN" id="pin" value={formData.pin} onChange={handleChange('pin')} placeholder="1111-1111-1111-1111" />
                    <div className="errorMessage"> {errors.pin}</div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default App;
