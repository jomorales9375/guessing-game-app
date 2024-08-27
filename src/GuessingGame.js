import React, { useState, useEffect } from "react";
import { Form, FormLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const GuessingGame = () => {
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("Start Guessing");
  const [randomNumber, setRandomNumber] = useState(null);
  const [timesGuessed, setTimesGuessed] = useState(null);

  useEffect(() => {
    if (randomNumber === null) {
      setRandomNumber(
        JSON.parse(localStorage.getItem("random")) || generateNum()
      );
    }

    if (timesGuessed === null) {
      setTimesGuessed(JSON.parse(localStorage.getItem("guesses")) || 0);
    }
  }, []);

  function generateNum() {
    let random = Math.floor(Math.random() * 100);

    localStorage.setItem("random", JSON.stringify(random));

    return random;
  }

  function handleSubmit(e) {
    e.preventDefault();
    let parsedNum = parseInt(guess);

    if ( parsedNum === randomNumber ) {
        setMessage("You got it!");   
    } else if  (parsedNum > randomNumber) {
        setMessage ("hey that's too high");
    } else   {
        setMessage("too low");
    }

    console.log(parsedNum);
    console.log(randomNumber);


    setTimesGuessed(timesGuessed + 1); 
    localStorage.setItem("guesses", JSON.stringify(timesGuessed + 1))


     
  }

  function handleChange(e) {
    if (!isNaN(e.target.value)) {
      setGuess(e.target.value);
    } else {
      alert("type a number");
    } 
  }


  function reset() {
    setGuess("");
    setMessage("Start Guessing");
    setTimesGuessed(0);
    setRandomNumber(generateNum());
    localStorage.removeItem("guesses")
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>I am thinking of a number between 1 and 100</Form.Label>
          <br />
          <FormLabel> You have made {timesGuessed} guesses</FormLabel>
          <Form.Control
            type="text"
            onChange={handleChange}
            value={guess}
            name="name"
          />

          <Button type="submit">Guess</Button> 
          <Form.Label> {message}</Form.Label>
          <Button onClick={reset} type="button">Reset</Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default GuessingGame;
