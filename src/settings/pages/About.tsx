import { FC } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Settings: FC = () => {
  const version = process.env.VERSION;

  return (
    <Row>
      <Col>
        <h1>About</h1>

        <p>
          <strong>CopyGuard v{version}</strong>
        </p>

        <p>
          <a href="https://github.com/roedesh/copyguard" target="_blank">
            Github
          </a>
          <span className="separator">|</span>
          <a href="https://ruud.je/blog/always-double-check-what-you-copy-from-websites/" target="_blank">
            Read the blog post for more in-depth info
          </a>
        </p>

        <hr />

        <p>
          This extension warns you whenever your copy action was hijacked. When you select text and copy it, this
          extension will compare your selection with the data that was added to your clipboard. If there is a
          difference, a native notification will be triggered.
        </p>
      </Col>
    </Row>
  );
};

export default Settings;
