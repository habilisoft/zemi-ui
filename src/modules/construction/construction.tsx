import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { CompoundForm } from "@/components/ui/compound-form";
import { Dialog } from "@/components/ui/dialog";
import { IFormSchema } from "@/types";
import { useState } from "react";
import { z } from "zod";

const formData: IFormSchema = {
  inputs: [
    {
      label: "Product name",
      name: "name",
      defaultValue: "",
      type: "text",
      placeholder: "produce name",
      validations: z.string().min(2, {
        message: "product name must be at least 2 characters.",
      }),
    },
    {
      label: "Fruit",
      name: "fruit",
      type: "select",
      options: [
        { label: "Orange", value: "orange" },
        { label: "Apple", value: "apple" },
        { label: "Watermelon", value: "watermelon" },
      ],
      defaultValue: "",
      placeholder: "select a fruit",
      validations: z.string(),
    },
    {
      label: "Social network",
      name: "socialnetwork",
      type: "checkbox",
      options: [
        { label: "Facebook", value: "1" },
        { label: "Twitter", value: "2" },
        { label: "Instagram", value: "3" },
      ],
      defaultValue: [],
      validations: z
        .array(z.string())
        .refine((value) => value.some((item) => item), {
          message: "You have to select at least one option.",
        }),
    },
    {
      label: "Country",
      name: "country",
      placeholder: "Select a country",
      type: "combobox",
      options: [
        { label: "English", value: "en" },
        { label: "French", value: "fr" },
        { label: "German", value: "de" },
        { label: "Spanish", value: "es" },
      ],
      defaultValue: null,
      validations: z.string({
        required_error: "Please select a country.",
      }),
    },
    {
      label: "Gender",
      name: "gender",
      type: "radioGroup",
      options: [
        { label: "F", value: "F" },
        { label: "M", value: "M" },
      ],
      defaultValue: null,
      validations: z.enum(["F", "M"], {
        required_error: "You need to select a option",
      }),
    },
    {
      label: "Bio",
      name: "bio",
      type: "textarea",
      defaultValue: "",
      validations: z.string(),
    },
    {
      label: "Expiration date",
      name: "expirationDate",
      type: "date",
      defaultValue: null,
      validations: z.date({
        required_error: "expiration date is required.",
      }),
    },
  ],
};

export const Construction = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [alertDialogIsOpen, setAlertDialogIsOpen] = useState(false);
  return (
    <div>
      Constructora
      <br />
      <br />
      <Button onClick={() => setDialogIsOpen(true)}>Open Dialog</Button>
      <br />
      <br />
      <Button onClick={() => setAlertDialogIsOpen(true)}>
        Open Alert Dialog
      </Button>
      <br />
      <br />
      <div className="w-1/3">
        <CompoundForm
          inputs={formData.inputs}
          title="Formulario"
          description="Desc"
          sendingRequest={false}
          onSubmit={(data) => console.log(JSON.stringify(data, null, 2))}
        />
      </div>
      <AlertDialog
        isOpen={alertDialogIsOpen}
        cancel={() => setAlertDialogIsOpen(false)}
        action={() => setAlertDialogIsOpen(false)}
        title="Alert Dialog title"
        description="Alert Dialog description"
      />
      <Dialog
        isOpen={dialogIsOpen}
        close={() => setDialogIsOpen(false)}
        title="Dialog title"
      >
        Content
      </Dialog>
    </div>
  );
};
