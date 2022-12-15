import { Link } from "react-router-dom";
import { badwords, removeWords } from "../../constants/badwords";
import { MdOutlineFullscreen } from "react-icons/md";

import classes from "./QuoteItem.module.css";

const QuoteItem = (props) => {
  // fitur sensor kalimat
  var Filter = require("bad-words"),
    filter = new Filter();

  filter.addWords(...badwords);
  filter.removeWords(...removeWords);

  // test Filter
  // console.log(filter.clean("tolol Tolol tOlol"));

  // console.log(filter.clean("...;"));

  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>
            {filter
              .clean(props.text + "/ma9/[p112ntap")
              .replace("/ma9/[p112ntap", "")}
          </p>
        </blockquote>
        <figcaption>{props.author}</figcaption>
      </figure>
      <Link
        to={`/quotes/${props.id}`}
        style={{ textDecoration: "none", color: "white" }}
      >
        <span className="btn long">View</span>
        <MdOutlineFullscreen className="short" />
      </Link>
    </li>
  );
};

export default QuoteItem;
// yang ditampilkan di all quotes
