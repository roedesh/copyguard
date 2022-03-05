import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import browser from "webextension-polyfill";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { LogState } from "../../types";
import InsightsDetail from "./InsightsDetail";
import InsightsOverview from "./InsightsOverview";

const Insights: FC = () => {
  const [logState, setLogState] = useState<LogState>({});
  const { id } = useParams();

  useEffect(() => {
    browser.storage.sync.get("log").then((result) => {
      setLogState(result.log);
    });
  }, []);

  return (
    <Row>
      <Col>
        <h1>Insights</h1>

        {id ? <InsightsDetail logState={logState} id={id} /> : <InsightsOverview logState={logState} />}
      </Col>
    </Row>
  );
};

export default Insights;
