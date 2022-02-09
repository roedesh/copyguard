import { FC, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import browser from "webextension-polyfill";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const HOSTNAME_REGEX = /^(?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?$/g;

const schema = yup
  .object()
  .shape({
    whitelist: yup
      .string()
      .test(
        "contains-valid-domains",
        'One or more lines were incorrect. Make sure to leave out the "http://" or "https://" part.',
        (value) => {
          const lines = value.split("\n");
          return !lines.find((line) => !line.match(HOSTNAME_REGEX));
        },
      ),
  })
  .required();

const Settings: FC = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      whitelist: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (settings) => {
    browser.storage.sync.set(settings);
    toast("Settings saved!", { type: "success" });
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
              render={({ field }) => (
                <Form.Control
                  {...field}
                  as="textarea"
                  rows={6}
                  isInvalid={!!errors.whitelist}
                  placeholder="www.example.com"
                />
              )}
            />
            <Form.Text className="text-muted">Enter one domain per line (e.g. www.example.com).</Form.Text>
            <Form.Control.Feedback type="invalid">{errors.whitelist?.message}</Form.Control.Feedback>
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
