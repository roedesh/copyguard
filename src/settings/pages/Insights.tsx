import { FC, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import browser from "webextension-polyfill";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import { saveToFile } from "../../utils";

type Warning = {
  type: string;
  selection: string;
  clipboard: string;
};

type LogState = {
  [key: string]: Warning[];
};

const Insights: FC = () => {
  const [logState, setLogState] = useState<LogState>({});
  const { id } = useParams();

  const onSave = () => {
    saveToFile(JSON.stringify(logState), "copyguard-log.json", "application/json");
  };

  useEffect(() => {
    browser.storage.sync.get("log").then((result) => {
      setLogState(result.log);
    });
  }, []);

  return (
    <Row>
      <Col>
        <h1>Insights</h1>

        {id ? (
          <>
            <p>View data for {id}.</p>

            <p>
              <Link
                to={{
                  pathname: "/insights",
                }}
              >
                Return to overview
              </Link>
            </p>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Selection</th>
                  <th>Clipboard</th>
                </tr>
              </thead>
              <tbody>
                {logState[id]?.map((warning, id) => {
                  return (
                    <tr key={`log_detail_${id}`}>
                      <td>{warning.type}</td>
                      <td>{warning.selection}</td>
                      <td>{warning.clipboard || "-"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </>
        ) : (
          <>
            <p>See which websites have altered your clipboard data.</p>

            <p>
              <Button onClick={onSave}>Save to file</Button>
            </p>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Host</th>
                  <th>Warnings</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(logState).map(([host, warnings], id) => {
                  return (
                    <tr key={`log_${id}`}>
                      <td>
                        <Link
                          to={{
                            pathname: `/insights/${host}`,
                          }}
                        >
                          {host}
                        </Link>
                      </td>
                      <td>{warnings.length}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </>
        )}
      </Col>
    </Row>
  );
};

export default Insights;
