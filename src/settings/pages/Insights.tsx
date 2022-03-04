import { FC, useState, useEffect } from "react";
import browser from "webextension-polyfill";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

const Insights: FC = () => {
  const [logState, setLogState] = useState([]);
  const version = process.env.VERSION;

  useEffect(() => {
    browser.storage.sync.get("log").then((result) => {
      setLogState(result.log);
    });
  }, []);

  return (
    <Row>
      <Col>
        <h1>Insights</h1>

        <p>See which websites have altered your clipboard data.</p>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Host</th>
              <th>Type</th>
              <th>Selection</th>
              <th>Clipboard</th>
            </tr>
          </thead>
          <tbody>
            {logState.map((log, id) => {
              return (
                <tr key={`log_${id}`}>
                  <td>{log.host}</td>
                  <td>{log.type}</td>
                  <td>{log.selection}</td>
                  <td>{log.clipboard}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default Insights;
