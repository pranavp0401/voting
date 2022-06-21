import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./Voting.css";

const Voting = () => {
  const navigate = useNavigate();
  const [isVote, setIsVote] = useState(0);
  const [isCat, setIsCat] = useState("");

  const [cat1, setCat1] = useState(0);
  const [cat2, setCat2] = useState(0);
  const [cat3, setCat3] = useState(0);

  const goToLogin = () => {
    navigate("/login");
  };

  const goToSignin = () => {
    navigate("/signin");
  };

  useEffect(() => {
    axios
      .get(`/user/username/${localStorage.getItem("username")}`)
      .then((response) => {
        console.log(response.data.message);
        if (response.data.message.vote === 1) {
          setIsVote(1);
          setIsCat(response.data.message.votecat);
        }
      })
      .catch((err) => console.log(`Error Occured: ${err.message}`));
  });

  useEffect(() => {
    axios
      .get("/vote/votes")
      .then((response) => {
        console.log(response);
        setCat1(response.data.message.cat1);
        setCat2(response.data.message.cat2);
        setCat3(response.data.message.cat3);
      })
      .catch((err) => console.log(`Error occured: ${err.message}`));
  });

  const gocat1 = () => {
    axios
      .put(`/vote/cat1/${localStorage.getItem("username")}`)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => console.log(`Error Occured: ${err.message}`));
  };

  const gocat2 = () => {
    axios
      .put(`/vote/cat2/${localStorage.getItem("username")}`)
      .then(window.location.reload())
      .catch((err) => console.log(`Error Occured: ${err.message}`));
  };

  const gocat3 = () => {
    axios
      .put(`/vote/cat3/${localStorage.getItem("username")}`)
      .then(window.location.reload())
      .catch((err) => console.log(`Error Occured: ${err.message}`));
  };

  return (
    <Container>
      {localStorage.getItem("isAuth") === "true" ? (
        isVote === 0 ? (
          <>
            <h2 className="text-center m-3">You are yet to vote</h2>
            <div className="d-flex justify-content-between m-5">
              <div className="category-1">
                <h3>Category-1</h3>
                <h4>Total Votes : {cat1}</h4>
                <button
                  className="btn btn-primary d-block mx-auto"
                  onClick={gocat1}
                >
                  Vote me
                </button>
              </div>

              <div className="category-2">
                <h3>Category-2</h3>
                <h4>Total Votes : {cat2}</h4>
                <button
                  className="btn btn-warning d-block mx-auto"
                  onClick={gocat2}
                >
                  Vote me
                </button>
              </div>

              <div className="category-2">
                <h3>Category-3</h3>
                <h4>Total Votes : {cat3}</h4>
                <button
                  className="btn btn-danger d-block mx-auto"
                  onClick={gocat3}
                >
                  Vote me
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-center m-3">You have voted to {isCat}</h2>
            <div className="d-flex justify-content-between m-5">
              <div className="category-1">
                <h3>Category-1</h3>
                <h4>Total Votes : {cat1}</h4>
              </div>

              <div className="category-2">
                <h3>Category-2</h3>
                <h4>Total Votes : {cat2}</h4>
              </div>

              <div className="category-2">
                <h3>Category-3</h3>
                <h4>Total Votes : {cat3}</h4>
              </div>
            </div>
          </>
        )
      ) : (
        <div className="d-flex gap-3 justify-content-center m-5">
          <button className="btn btn-warning" onClick={goToLogin}>
            Login
          </button>
          <button className="btn btn-primary" onClick={goToSignin}>
            Signup
          </button>
        </div>
      )}
    </Container>
  );
};

export default Voting;
