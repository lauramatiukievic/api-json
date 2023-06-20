import React from "react";

import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config";

function CreateUser({ onCreate }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState([]);
  const [street, setStreet] = useState("");
  const [suite, setSuite] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    axios.get(`${API_URL}/users`).then((res) => {
      setUser(res.data[0].id);
    });
  }, []);

  const nameHandler = (event) => setName(event.target.value);
  const surnameHandler = (event) => setSurname(event.target.value);
  const emailHandler = (event) => setEmail(event.target.value);
  const streetHandler = (event) => setStreet(event.target.value);
  const suiteHandler = (event) => setSuite(event.target.value);
  const cityHandler = (event) => setCity(event.target.value);
  const zipcodeHandler = (event) => setZipcode(event.target.value);
  const latHandler = (event) => setLat(event.target.value);
  const lngHandler = (event) => setLng(event.target.value);
  const phoneHandler = (event) => setPhone(event.target.value);
  const websiteHandler = (event) => setWebsite(event.target.value);
  const companyNameHandler = (event) => setCompanyName(event.target.value);

  const newUserHandler = (event) => {
    event.preventDefault();
    const newUser = {
      name: name,
      surname: surname,
      email: email,
      address: { street: street, city: city, suite: suite, zipcode: zipcode, geo: { lat: lat, lng: lng } },
      phone: phone,
      website: website,
      company: { companyName: companyName },
      userId: Number(user),
    };

    axios.post(`${API_URL}/users`, newUser).then((res) => console.log(res.data));
    onCreate();
  };

  return (
    <form onSubmit={newUserHandler}>
      <div className="form-control">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={nameHandler} />
      </div>

      <div className="form-control">
        <label htmlFor="surname">Surname:</label>
        <input type="text" id="surname" name="surname" value={surname} onChange={surnameHandler} />
      </div>
      <div className="form-control">
        <label htmlFor="Email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={emailHandler} />
      </div>
      <div>
        <h2>Adress:</h2>
        <div className="form-control">
          <label htmlFor="street">Street:</label>
          <input type="text" id="street" name="street" value={street} onChange={streetHandler} />
        </div>
        <div className="form-control">
          <label htmlFor="suite">Suite:</label>
          <input type="text" id="suite" name="suite" value={suite} onChange={suiteHandler} />
        </div>
        <div className="form-control">
          <label htmlFor="city">City:</label>
          <input type="text" id="city" name="city" value={city} onChange={cityHandler} />
        </div>
        <div className="form-control">
          <label htmlFor="zipcode">ZipCode:</label>
          <input type="number" id="zipcode" name="zipcode" value={zipcode} onChange={zipcodeHandler} />
        </div>
        <div className="form-control">
          <label htmlFor="lat">Lat:</label>
          <input type="number" id="lat" name="lat" value={lat} onChange={latHandler} />
        </div>
        <div className="form-control">
          <label htmlFor="lng">Lng:</label>
          <input type="number" id="lng" name="lng" value={lng} onChange={lngHandler} />
        </div>
        <div className="form-control">
          <label htmlFor="phone">Phone:</label>
          <input type="phone" id="phone" name="phone" value={phone} onChange={phoneHandler} />
        </div>

        <div>
          <h2>Company info:</h2>
          <div className="form-control">
            <label htmlFor="website">Website:</label>
            <input type="text" id="website" name="website" value={website} onChange={websiteHandler} />
          </div>
          <div className="form-control">
            <label htmlFor="companyName">Company name:</label>
            <input type="text" id="companyName" name="companyName" value={companyName} onChange={companyNameHandler} />
          </div>
        </div>
      </div>

      <input type="submit" value="Create new user" />
    </form>
  );
}

export default CreateUser;
