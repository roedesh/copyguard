import { FC } from "react";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import SaveForm from "../components/SaveForm";
import { useStorage } from "../providers/StorageProvider";

const InsightsOverview: FC = () => {
  const { warningMap } = useStorage();

  return (
    <Row>
      <Col>
        <h1>Insights</h1>

        <p>See which websites have altered your clipboard data.</p>

        <SaveForm warningMap={warningMap} />

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Host</th>
              <th>Warnings</th>
            </tr>
          </thead>
          <tbody>
            {warningMap && Object.keys(warningMap).length ? (
              Object.entries(warningMap).map(([host, warnings], id) => {
                return (
                  <tr data-testid={`host-${host}`} key={`log_${id}`}>
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
              })
            ) : (
              <tr>
                <td colSpan={2}>No warnings have been logged yet.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default InsightsOverview;
