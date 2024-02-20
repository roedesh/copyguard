<script lang="ts">
  import { Button, Input } from "@sveltestrap/sveltestrap";
  import { createForm } from "felte";
  import { storage } from "../../stores/storage";
  import { saveToFile } from "../../internal/fs";

  type WarningsExport = Record<
    string,
    { type: string; selection?: string; clipboard?: string }[]
  >;

  const stripClipboardData = (logState: WarningsExport) => {
    const data = { ...logState };
    Object.keys(data).forEach((key) => {
      data[key] = data[key].map(({ type }) => ({ type }));
    });
    return data;
  };

  const { form } = createForm({
    initialValues: {
      includeClipboard: false,
    },
    async onSubmit(values) {
      const now = Date.now();
      const dataToSave = values.includeClipboard
        ? $storage.warnings
        : stripClipboardData($storage.warnings);
      saveToFile(
        JSON.stringify(dataToSave),
        `copyguard-log-${now}.json`,
        "application/json",
      );
    },
  });
</script>

<form class="save-form" use:form>
  <Button class="save-to-file-btn" color="primary">Save to file</Button>
  <Input
    name="includeClipboard"
    type="switch"
    inline
    label="include clipboard data"
  />
</form>
