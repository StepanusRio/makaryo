"use client";
import { updateNotesAction, updateStatusAction } from "@/actions";
import { TicketColumn } from "@/app/(dashboard)/tiketing/_components/columns";
import { UpdateTicketNote } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
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
import Modal from "../ui/modal";
import { Textarea } from "../ui/textarea";

interface AddNoteModalProps {
  isOpen: boolean;
  data: TicketColumn;
  onClose: () => void;
  status?: string;
}

type AddNoteFormValues = z.infer<typeof UpdateTicketNote>;

export const AddNoteModal: FC<AddNoteModalProps> = ({
  isOpen,
  onClose,
  data,
  status,
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<AddNoteFormValues>({
    resolver: zodResolver(UpdateTicketNote),
    defaultValues: {
      notes: data.notes || "",
    },
  });
  const onSubmit = async (val: AddNoteFormValues) => {
    try {
      setLoading(true);
      if (status) {
        status === "Proccess"
          ? await updateStatusAction(data.ticket_id, "Pending")
          : await updateStatusAction(data.ticket_id, status);
        await updateNotesAction(data.ticket_id, val.notes);
      }
      if (!status) {
        await updateNotesAction(data.ticket_id, val.notes);
      }
      setLoading(false);
      onClose();
      router.refresh();
    } catch (error) {}
  };
  return (
    <Modal
      title={status === "Proccess" || status === "Void" ? `` : `Edit Notes`}
      description={
        status === "Proccess" || status === "Void" ? `` : `Edit Notes`
      }
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-5">
            {status ? (
              <div className="grid grid-cols-2 gap-x-5">
                <FormItem>
                  <FormLabel>Ticket ID</FormLabel>
                  <Input value={data.ticket_id} disabled />
                </FormItem>
                <FormItem>
                  <FormLabel>Informer</FormLabel>
                  <Input value={data.informer} disabled />
                </FormItem>
                <FormItem className="col-span-2">
                  <FormLabel>Issue</FormLabel>
                  <Input value={data.issue} disabled />
                </FormItem>
              </div>
            ) : null}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="Add your note"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={loading}
              variant={
                status === "Proccess"
                  ? "default"
                  : status === "Void"
                  ? "default"
                  : "destructive"
              }
              type="submit"
            >
              {status ? `${status}` : "Edit Note"}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
