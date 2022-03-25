import { FC } from "react";
import { Link, useParams } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import { useStorage } from "../providers/StorageProvider";

const InsightsDetail: FC = () => {
  const { id } = useParams();
  const { warningMap } = useStorage();
  const warnings = id ? warningMap?.[id] ?? [] : [];

  return (
    <Row>
      <Col>
        <h1>Insights</h1>

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
            {warnings.map((warning, id) => {
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
      </Col>
    </Row>
  );
};

export default InsightsDetail;
