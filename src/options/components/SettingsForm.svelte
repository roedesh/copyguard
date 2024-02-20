<script lang="ts">
  import {
    Button,
    FormGroup,
    FormText,
    Input,
    Label,
  } from "@sveltestrap/sveltestrap";

  import { storage, updateStorage } from "../../stores/storage";
  import { createForm } from "felte";
  import { validator } from "@felte/validator-yup";
  import * as yup from "yup";

  const HOSTNAME_REGEX =
    /^(((?!-))(xn--|_)?[a-z0-9-]{0,61}[a-z0-9]{1,1}\.)*(xn--)?([a-z0-9][a-z0-9\-]{0,60}|[a-z0-9-]{1,30}\.[a-z]{2,})$/;

  const schema = yup
    .object()
    .shape({
      whitelist: yup
        .string()
        .test(
          "contains-valid-domains",
          'One or more lines were incorrect. Make sure to leave out the protocol (e.g. "https://").',
          (value) => {
            const lines = (value ?? "").split("\n");
            return !lines.find((line: string) => !line.match(HOSTNAME_REGEX));
          },
        ),
    })
    .required();

  const { form, errors, touched, isDirty, isValid, setInitialValues, reset } =
    createForm({
      initialValues: {
        whitelist: $storage.whitelist,
      },
      extend: validator({ schema }),
      async onSubmit(values) {
        await updateStorage((storage) => {
          return {
            ...storage,
            whitelist: values.whitelist,
          };
        });
        setInitialValues(values);
        reset();
      },
    });
</script>

<form use:form>
  <FormGroup>
    <Label for="whitelist">Whitelist</Label>
    <Input
      id="whitelist"
      name="whitelist"
      rows={10}
      type="textarea"
      placeholder="www.example.com"
      valid={$touched.whitelist && !$errors.whitelist?.length}
      invalid={$errors.whitelist?.length}
      feedback={$errors.whitelist}
    />
    <FormText>Enter one domain per line (e.g. www.example.com).</FormText>
  </FormGroup>
  <Button color="primary" disabled={!$isDirty || !$isValid} type="submit">
    Save settings
  </Button>
</form>
