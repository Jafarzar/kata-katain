import { Fragment, useRef, useState } from "react";
import { Prompt } from "react-router-dom";

import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm = (props) => {
  const [isEntering, setIsEntering] = useState(false);

  const isEmpty = (value) => value.trim() === "";

  const authorInputRef = useRef();
  const textInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    if (/^.*w.*$/.test(enteredText)) {
      alert("Wrong content!");
      return;
    }

    const enteredAuthorIsValid = !isEmpty(enteredAuthor);
    const enteredTextIsValid = !isEmpty(enteredText);

    // eslint-disable-next-line no-lone-blocks
    {
      enteredAuthorIsValid &&
        enteredTextIsValid &&
        props.onAddQuote({ author: enteredAuthor, text: enteredText });
    }
  }

  const finishEnteringHandler = () => {
    setIsEntering(false);
  };

  const formFocusedHandler = () => {
    setIsEntering(true);
  };

  return (
    <Fragment>
      <Prompt
        when={isEntering}
        message={(location) =>
          "Are you sure you want to leave? All your entered data will be lost!"
        }
      />
      <Card>
        <form
          onFocus={formFocusedHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              ref={authorInputRef}
              pattern="^.*\w.*$"
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef} required></textarea>
          </div>
          <div className={classes.actions}>
            <button onClick={finishEnteringHandler}>Add Quote</button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default QuoteForm;
