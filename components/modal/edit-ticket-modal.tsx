"use client";

import { closeTicketAction } from "@/actions";
import { TicketColumn } from "@/app/(dashboard)/tiketing/_components/columns";
import Modal from "@/components/ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useCurrentRole } from "@/hooks/use-current-role";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UpdateTicketScemas } from "@/schemas";
import { EmployeeType, ISSUE_TYPE } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface EditTicketModalProps {
  employe?: EmployeeType[];
  data: TicketColumn;
  isOpen: boolean;
  onClose: () => void;
}

type DoneByValue = z.infer<typeof UpdateTicketScemas>;

export const EditTicketModal: FC<EditTicketModalProps> = ({
  data,
  isOpen,
  onClose,
  employe,
}) => {
  const user = useCurrentUser();
  const router = useRouter();
  const [loading, setTransition] = useTransition();
  const role = useCurrentRole();
  const form = useForm<DoneByValue>({
    resolver: zodResolver(UpdateTicketScemas),
    defaultValues: {
      worker: data.done_by || user?.ID,
      issue_type: data.issue_type || "Unspecified",
      summary: data.summary,
      ticket_id: data.ticket_id,
    },
  });
  const onSubmit = async (val: DoneByValue) => {
    try {
      setTransition(async () => {
        if (val.ticket_id && val.worker && val.summary && val.issue_type) {
          await closeTicketAction(
            val.ticket_id,
            val.worker,
            val.summary,
            val.issue_type
          ).then((res) => {
            onClose();
            router.refresh();
            toast.success(res);
          });
        } else {
          console.error("One or more required fields are missing");
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Modal
      title="Detail Issue"
      description=""
      isOpen={isOpen}
      onClose={onClose}
    >
      <Separator className="mb-3" />
      <div className="grid grid-cols-2 gap-x-10 gap-y-3">
        <div className="grid gap-3">
          <Label className="text-base font-bold">Ticket Id</Label>
          <Input value={data.ticket_id} disabled />
        </div>
        <div className="grid gap-3">
          <Label className="text-base font-bold">Informer</Label>
          <Input value={data.informer} disabled />
        </div>
        <div className="grid col-span-2">
          <Label className="text-base font-bold">Issue</Label>
          <Textarea className="h-[100px]" value={data.informer} disabled />
        </div>
        <div className="grid col-span-2">
          <Label className="text-base font-bold">Notes</Label>
          <Textarea
            value={data.notes || "No notes available"}
            className="h-[100px]"
            disabled
          />
        </div>
      </div>
      <Form {...form}>
        <form
          className="grid grid-cols-2 gap-x-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="my-5 gap-5">
            <FormField
              control={form.control}
              name="worker"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  required
                >
                  <FormLabel className="font-bold text-base">Petugas</FormLabel>
                  <SelectTrigger
                    disabled={
                      data.ticket_status === "Done" ||
                      data.ticket_status === "Void" ||
                      data.ticket_status === "Pembelian"
                        ? true
                        : loading
                    }
                  >
                    <SelectValue placeholder="Pilih Petugas" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* on future map from database */}
                    {employe?.map((item: EmployeeType) => (
                      <SelectItem key={item.ID} value={item.ID}>
                        {item.NAMA}
                      </SelectItem>
                    ))}
                  </SelectContent>
                  <FormMessage />
                </Select>
              )}
            />
          </div>
          {role === "7" ? (
            <div className="my-5 gap-5">
              <FormField
                control={form.control}
                name="issue_type"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value || undefined}
                  >
                    <FormLabel className="font-bold text-base">
                      Issue Type
                    </FormLabel>
                    <SelectTrigger
                      disabled={
                        data.ticket_status === "Done" ||
                        data.ticket_status === "Void" ||
                        data.ticket_status === "Pembelian"
                          ? true
                          : loading
                      }
                    >
                      <SelectValue placeholder="Pilih Issue" />
                    </SelectTrigger>
                    <SelectContent>
                      {ISSUE_TYPE.map((item, index) => (
                        <SelectItem value={item} key={index}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          ) : (
            <div className="my-5 hidden gap-5">
              <FormField
                control={form.control}
                name="issue_type"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value || ""}
                  >
                    <FormLabel className="font-bold text-base">
                      Issue Type
                    </FormLabel>
                    <SelectTrigger
                      disabled={
                        data.ticket_status === "Done" ||
                        data.ticket_status === "Void" ||
                        data.ticket_status === "Pembelian"
                          ? true
                          : loading
                      }
                    >
                      <SelectValue placeholder="Pilih Issue" />
                    </SelectTrigger>
                    <SelectContent>
                      {ISSUE_TYPE.map((item, index) => (
                        <SelectItem value={item} key={index}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          )}
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={
                        data.ticket_status === "Done" ||
                        data.ticket_status === "Void" ||
                        data.ticket_status === "Pembelian"
                          ? true
                          : loading
                      }
                      placeholder="Summary"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div
            className={`col-span-2 mt-5 ${
              data.ticket_status === "Done" ||
              data.ticket_status === "Void" ||
              data.ticket_status === "Pembelian"
                ? "hidden"
                : ""
            }`}
          >
            <Button type="submit" disabled={loading} className="w-full">
              Selesaikan
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
