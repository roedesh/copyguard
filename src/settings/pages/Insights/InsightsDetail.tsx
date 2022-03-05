import { FC } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { LogState } from "../../types";

type InsightsDetailProps = {
  logState: LogState;
  id?: string;
};

const InsightsDetail: FC<InsightsDetailProps> = ({ logState, id }) => {
  const warnings = id ? logState?.[id] ?? [] : [];

  return (
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
    </>
  );
};

export default InsightsDetail;
