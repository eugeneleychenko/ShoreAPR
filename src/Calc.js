import React from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import "./styles.css";
import CurrencyInput from "react-currency-input-field";

const APRForm = () => {
  const [amount, setAmount] = React.useState();
  const [payment, setPayment] = React.useState();
  const [payments, setPayments] = React.useState();
  const [ppy, setPpy] = React.useState(0);
  const [apr, setApr] = React.useState(0);
  const [frequency, setFrequency] = React.useState("");

  const handleCalculate = () => {
    // Check if all the form fields are filled out
    const APRGuess = 0.22;
    const partial = 0;
    const full = 1;
    const result = findAPR(
      amount,
      payment,
      payments,
      ppy,
      APRGuess,
      partial,
      full
    );
    setApr(result.toFixed(2));
    if (APRGuess === result) {
      alert("Please fill out all fields");
      return;
    }
  };

  function findAPR(amount, payment, payments, ppy, APRGuess, partial, full) {
    let result = APRGuess;
    let tempguess = APRGuess;

    do {
      result = tempguess;
      //Step 1
      let i = tempguess / (100 * ppy);
      let A1 = generalEquation(payments, payment, full, partial, i);
      //Step 2
      let i2 = (tempguess + 0.1) / (100 * ppy);
      let A2 = generalEquation(payments, payment, full, partial, i2);
      //Step 3
      tempguess = tempguess + (0.1 * (amount - A1)) / (A2 - A1);
    } while (Math.abs(result * 10000 - tempguess * 10000) > 1);
    return result;
  }

  function generalEquation(period, payment, initialPeriods, fractions, rate) {
    let retval = 0;
    for (let x = 0; x < period; x++)
      retval +=
        payment /
        ((1.0 + fractions * rate) * Math.pow(1 + rate, initialPeriods + x));
    return retval;
  }

  // function currencyFormat(val) {
  //   var nStr = val;
  //   nStr = nStr.replace(/,/g, "");
  //   nStr = nStr.replace(/£/g, "");
  //   nStr += '';
  //   var x = nStr.split('.');
  //   var x1 = x[0];
  //   var x2 = x.length > 1 ? '.' + x[1] : '';
  //   var rgx = /(\d+)(\d{3})/;
  //   while (rgx.test(x1)) {
  //     x1 = x1.replace(rgx, '$1' + ',' + '$2');
  //   }
  //   return "$" + x1 + x2;
  // }

  const handleFrequencyChange = (e) => {
    setFrequency(e.target.value);
    if (e.target.value === "daily") {
      setPpy(365);
    } else setPpy(52);
  };

  const handleReset = () => {
    setAmount("");
    setPayment("");
    setPayments("");
    setPpy(0);
    setApr(0);
    setFrequency("");
    resetDropdown();
  };

  const resetDropdown = () => {
    document.getElementsByTagName("select")[0].value = "";
  };

  return (
    <Form>
      <Form.Group
        controlId="amount"
        // style={{ padding: "10px", margin: "10px" }}
        // placeholder="100,000"
      >
        <Form.Label>Funding Amount ($) </Form.Label>
        {/* <Form.Control
          // required
          // placeholder="100,000"

          type="number"
          value={amount}
          // onChange={(e) => setAmount(e.target.value)}
        /> */}
      </Form.Group>

      <CurrencyInput
        className="form-control"
        id="fundingamt-example"
        name="fundingamt-name"
        placeholder="$100,000"
        // defaultValue={1000}
        value={amount}
        decimalsLimit={2}
        intlConfig={{ locale: "en-US", currency: "USD" }}
        onValueChange={(value, name) => setAmount(value)}
      />

      <Form.Group controlId="ppy">
        {/* <Form.Label># of Payments Per Year </Form.Label> */}
        <Form.Control
          type="number"
          value={ppy}
          onChange={(e) => setPpy(e.target.value)}
          style={{ display: "none" }}
        />

        <Form.Label>Frequency</Form.Label>
        <Form.Control as="select" onChange={handleFrequencyChange}>
          <option value=""> </option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </Form.Control>
      </Form.Group>

      <Form.Group
        controlId="payments"
        // style={{ padding: "10px", margin: "10px" }}
      >
        <Form.Label># of Total Payments </Form.Label>
        <Form.Control
          placeholder="52"
          type="number"
          value={payments}
          onChange={(e) => setPayments(e.target.value)}
        />
      </Form.Group>

      <Form.Group
        controlId="payment"
        // style={{ padding: "10px", margin: "10px" }}
      >
        <Form.Label>Payment ($) </Form.Label>
        {/* <Form.Control
          placeholder="5,000"
          type="number"
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
        /> */}

        <CurrencyInput
          className="form-control"
          id="paymentamt-example"
          name="paymentamt-name"
          placeholder="$350"
          // defaultValue={1000}
          value={payment}
          decimalsLimit={2}
          intlConfig={{ locale: "en-US", currency: "USD" }}
          onValueChange={(value) => setPayment(value)}
        />
      </Form.Group>
      <Form.Group controlId="full" className="checkbox">
        {/* <Form.Label>
          <Form.Check type="checkbox" onChange={() => toggleFull()} />
          Full
        </Form.Label> */}
      </Form.Group>
      <Button variant="primary" onClick={handleCalculate}>
        Calculate
      </Button>
      <Button variant="danger" onClick={handleReset}>
        Reset
      </Button>
      <br />
      <br />

      <Form.Group>
        <Form.Label>APR (%)</Form.Label>
        {/* <Form.Control type="number" placeholder="APR" value={apr} readOnly /> */}
        <CurrencyInput
          suffix="%"
          value={apr}
          disabled={true}
          className="form-control"
        />
      </Form.Group>
    </Form>
  );
};

export default APRForm;
