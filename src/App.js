import React, {useEffect, useState} from "react";
import Particles, {initParticlesEngine} from "@tsparticles/react";
import {loadFull} from "tsparticles";
import "./App.css";
import particlesOptions from "./particles.json";
import spidr from "./spidr.png";

// custom input
function MyInput({label, id, value, onChange}) {
    return (
      <div className="MyInput">
        <label>{label}:
          <input type="text" id={id} value={value} onChange={onChange}/>
        </label>
      </div>
    )
}

function App() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        if (init) {
            return;
        }

        initParticlesEngine(async (engine) => {
            await loadFull(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

     // input array
     const [formData, setFormData] = useState({
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
        console.log(formData);
    };



    return (
        <div className="App">
            {init && <Particles options={particlesOptions}/>}
            <header className="App-header">
                <img className="Spidr" src={spidr} alt="spidr"/>
            </header>
            <div className="FormContainer">
                <header className="Form-header">Please complete the following interest form: </header>
                <form className="Form" onSubmit={onSubmit}>
                    <MyInput label="First Name" id="fname" value={formData.fname} onChange={handleChange('fname')}/>
                    <MyInput label="Last Name" id="lname" value={formData.lname} onChange={handleChange('lname')} />
                    <MyInput label="Phone Number" id="phone" value={formData.phone} onChange={handleChange('phone')} />
                    <MyInput label="Email" id="email" value={formData.email} onChange={handleChange('email')} />
                    <MyInput label="Guess our air fryer's cost" id="cost" value={formData.cost} onChange={handleChange('cost')} />
                    <MyInput label="Spidr Pin" id="pin" value={formData.pin} onChange={handleChange('pin')} />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default App;
