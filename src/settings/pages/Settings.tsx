import { FC, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import browser from "webextension-polyfill";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const Settings: FC = () => {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      whitelist: "",
    },
  });

  const onSubmit = (settings) => {
    browser.storage.sync.set(settings);
  };

  useEffect(() => {
    browser.storage.sync.get("whitelist").then((result) => {
      setValue("whitelist", result.whitelist);
    });
  }, []);

  return (
    <Row>
      <Col>
        <h1>Settings</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Whitelist</Form.Label>
            <Controller
              name="whitelist"
              control={control}
              render={({ field }) => <Form.Control {...field} as="textarea" rows={6} />}
            />

            <Form.Text className="text-muted">Enter one domain per line (e.g. www.example.com).</Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Settings;
