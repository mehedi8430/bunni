import { useAppSelector } from "@/redux/hooks";
import { selectBusinessInfo, setBusinessInfo } from "@/redux/slices/busynessSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { z } from "zod";

export const formSchema = z.object({
  like_to_do: z.string().min(1, "Please select at least one option"),
});

export default function useWhatWouldLikeToDo() {
  const busynessData = useAppSelector(selectBusinessInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      like_to_do: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const updatedBusynessData = { ...busynessData, ...values };
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    dispatch(setBusinessInfo(updatedBusynessData));
    navigate(`/business-setup/add-phone-number`, { replace: true });
  }
  return { form, onSubmit };
}
