import React, {
  createRef,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { BsChevronRight } from "react-icons/bs";
import { IEntry } from "../../context/EntryContext";
import { debounce } from "../../util/helper";
import StatusIndiciator from "../StatusIndicator";

const Entry: FunctionComponent<{ entry: IEntry }> = ({ entry }) => {
  const glanceRef = createRef<HTMLDivElement>();
  const detailRef = createRef<HTMLDivElement>();

  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    reWork();

    window.addEventListener("resize", debounce(reWork));
    return () => {
      window.removeEventListener("resize", debounce(reWork));
    };
  }, []);

  useEffect(() => {
    reWork();
  }, [open]);

  const reWork = () => {
    if (glanceRef.current && detailRef.current) {
      const glanceHeight = glanceRef.current.offsetHeight;
      const detailHeight = detailRef.current.offsetHeight;
      if (open) {
        setHeight(glanceHeight + detailHeight);
      } else {
        setHeight(glanceHeight);
      }
    }
  };

  return (
    <div
      className="entry"
      style={{ height: `calc(${height}px + ${open ? "1rem" : "0px"})` }}
    >
      <div
        className="entry-glance"
        ref={glanceRef}
        onClick={() => setOpen(!open)}
      >
        <div className="primary1">
          <StatusIndiciator status={entry.status} />
          <p>{entry.file}</p>
        </div>

        <BsChevronRight className="entry-icon" aria-expanded={open} />
      </div>
      <div className="entry-detail" ref={detailRef}>
        Detail
      </div>
    </div>
  );
};

export default Entry;
