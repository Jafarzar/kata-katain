import { Fragment, useState } from "react";
import truncate from "lodash.truncate";
import slice from "lodash.slice";

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const [index, setIndex] = useState(8);
  const initialPosts = slice(sortQuotes(props.quotes), 0, index);

  // const history = useHistory();
  // const location = useLocation();

  // const queryParams = new URLSearchParams(location.search);

  // const isSortingAscending = queryParams.get("sort") === "asc";

  // const sortedQuotes = sortQuotes(props.quotes, isSortingAscending);

  // const changeSortingHandler = () => {
  //   history.push({
  //     pathname: location.pathname,
  //     search: `?sort=${isSortingAscending ? "desc" : "asc"}`,
  //   });
  // };

  const loadMore = () => {
    setIndex(index + 5);
    console.log(index);
  };

  return (
    <Fragment>
      {/* <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? "Descending" : "Ascending"}
        </button>
      </div> */}
      <ul className={classes.list}>
        {/* {sortedQuotes?.map((quote) => {
          return (
            
          );
        })} */}
        {initialPosts.map((quote) => {
          return (
            <QuoteItem
              key={quote.id}
              id={quote.id}
              author={quote.author}
              text={truncate(quote.text, { length: 70 })}
            />
          );
        })}
      </ul>
      <button onClick={loadMore} type="button" className="btn centered">
        Load More +
      </button>
    </Fragment>
  );
};

export default QuoteList;
