import { actionCreators, RootState } from "features";
import React, { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  EEntryMethods,
  IEntry,
  ISocketEntryRecieving,
  ISocketEntrySending,
} from "../../interfaces/IEntryInterfaces";
import socket from "../../util/socket";
import Detail from "./Detail";
import Glance from "./Glance";

const Entry: FunctionComponent<{ entry: IEntry }> = ({ entry }) => {
  const dispatch = useDispatch();

  const state = useSelector((state: RootState) => state);
  const { setComments } = bindActionCreators(
    actionCreators.EntriesActions,
    dispatch
  );

  useEffect(() => {
    if (entry.meta.open) {
      socket.on(entry.id, socketHandle);
      const outgoing_data: ISocketEntrySending = {
        METHOD: EEntryMethods.REQUEST,
        data: {
          entryId: entry.id,
          userToken: state.auth.user.token,
        },
      };
      socket.emit("entry", outgoing_data);
    }

    return () => {
      socket.off(entry.id, socketHandle);
    };
  }, [entry.meta.open]);

  const socketHandle = (args: ISocketEntryRecieving) => {
    switch (args.METHOD) {
      case EEntryMethods.COMMENT_RESPONSE:
        setComments(entry.id, args.data.comments);
        break;
    }
  };

  return (
    <div className="entry">
      <Glance entry={entry} />
      <Detail entry={entry} />
    </div>
  );
};

export default Entry;
