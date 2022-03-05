import { FC } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import SaveForm from "../../components/SaveForm";
import { LogState } from "../../types";

type InsightsOverviewProps = {
  logState: LogState;
};

const InsightsOverview: FC<InsightsOverviewProps> = ({ logState }) => {
  return (
    <>
      <p>See which websites have altered your clipboard data.</p>

      <SaveForm logState={logState} />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Host</th>
            <th>Warnings</th>
          </tr>
        </thead>
        <tbody>
          {logState &&
            Object.entries(logState).map(([host, warnings], id) => {
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
  );
};

export default InsightsOverview;
