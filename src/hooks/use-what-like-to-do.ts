import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

export const formSchema = z.object({
  likeToDo: z.string().min(1, "Please select at least one option"),
});

export default function useWhatWouldLikeToDo() {
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      likeToDo: "",
    },
  });

  console.log("Form values:", form.getValues());
  console.log("Form errors:", form.formState.errors);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    navigate(`/dashboard`);
  }
  return { form, onSubmit };
}
