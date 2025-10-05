import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCustomerApi } from "@/mock-api-hook/features/customers/useCustomerApi";
import { useAppSelector } from "@/redux/hooks";
import { templateSelector } from "@/redux/slices/invoiceTemplateSlice";
import { useState } from "react";


export default function SendViaModal({onClose}: {onClose?: () => void}) {
    const [sendViaEmail, setsendViaEmail] = useState(true);
    const [sendViaSMS, setsendViaSMS] = useState(false);
    const [, setCopyLink] = useState(false);

    const {
        customerId,
    } = useAppSelector(templateSelector);
    const { customer } = useCustomerApi(customerId);
    console.log({ customer });
    return (
        <section>
            <RadioGroup defaultValue="email">
                <div>
                    <div onClick={() => {
                        setsendViaEmail(true)
                        setsendViaSMS(false)
                        setCopyLink(false)
                    }} className="flex items-center gap-3 w-fit">
                        <RadioGroupItem value="email" id="send-via-email" />
                        <Label htmlFor="send-via-email" className="cursor-pointer">Email</Label>
                    </div>
                    {
                        sendViaEmail && (
                            <div className="mt-2">
                                <Input id="email-address" placeholder="Enter email address" value={customer?.email || ""} />
                            </div>
                        )
                    }
                </div>

                <div>
                    <div onClick={() => {
                        setsendViaSMS(true)
                        setsendViaEmail(false)
                        setCopyLink(false)
                    }} className="flex items-center gap-3 w-fit">
                        <RadioGroupItem value="sms" id="send-via-sms" />
                        <Label htmlFor="send-via-sms" className="cursor-pointer">SMS</Label>
                    </div>
                    {
                        sendViaSMS && (
                            <div className="mt-2">
                                <Input id="sms-number" placeholder="Enter SMS number" value={customer?.phone || ""} />
                            </div>
                        )
                    }
                </div>

                <div onClick={() => {
                    setCopyLink(true)
                    setsendViaSMS(false)
                    setsendViaEmail(false)
                }} className="flex items-center gap-3 w-fit">
                    <RadioGroupItem value="copy-link" id="send-via-copy-link" />
                    <Label htmlFor="send-via-copy-link" className="cursor-pointer">Copy Link</Label>
                </div>
            </RadioGroup>

            <div className="flex justify-end">
                <Button className="mt-6" variant="primary" onClick={onClose}>Send</Button>
            </div>
        </section >
    )
}
