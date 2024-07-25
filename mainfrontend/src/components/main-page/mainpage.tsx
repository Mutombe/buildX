import { useState } from "react";
import { Alert } from "react-bootstrap";
import MainButton from "../button/button";

export default function WelcomeAlert() {
  const [show, setShow] = useState(true);

  return (
    <>
      {show ? (
        <Alert variant="success">
          <Alert.Heading>Welcome to out Property rental platform</Alert.Heading>
          <p>
            We are here to solve your renter and tenant problems. Now you can
            get your tenants online with no hustle. Its now easier for tenants
            to get notified when their dream rental house is free of occupation
            or see the benefits and perks of renting that property in realtime
            without being physically present.
          </p>
          <hr></hr>
          <div className="d-flex justify-content-end">
            <MainButton
              variant="outline-success"
              text="X"
              onClick={() => setShow(false)}
            />
          </div>
        </Alert>
      ) : (
        <MainButton
          variant="primary"
          text="Show Alert"
          onClick={() => setShow(true)}
        />
      )}
    </>
  );
}
