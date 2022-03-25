import { useForm, Controller } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { saveToFile } from "../../utils/fs";

const stripClipboardData = (logState) => {
  const data = { ...logState };
  Object.keys(data).forEach((key) => {
    data[key] = data[key].map(({ type }) => ({ type }));
  });
  return data;
};

const SaveForm = ({ warningMap }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      includeClipboard: "",
    },
  });

  const onSubmit = (saveSettings) => {
    const dataToSave = saveSettings.includeClipboard ? warningMap : stripClipboardData(warningMap);
    saveToFile(JSON.stringify(dataToSave), "copyguard-log.json", "application/json");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="save-form">
        <Button type="submit">Save to file</Button>

        <Controller
          name="includeClipboard"
          control={control}
          render={({ field }) => (
            <Form.Check
              {...field}
              inline
              type="switch"
              name="include-clipboard"
              label="include clipboard data"
              className="push-right"
            />
          )}
        />
      </div>
    </Form>
  );
};

export default SaveForm;
