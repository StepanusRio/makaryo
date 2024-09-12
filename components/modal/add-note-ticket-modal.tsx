"use client";
import { TicketColumn } from "@/app/(dashboard)/tiketing/_components/columns";
import { UpdateTicketNote } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form, FormField, FormItem, FormLabel } from "../ui/form";
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
  const form = useForm<AddNoteFormValues>({
    resolver: zodResolver(UpdateTicketNote),
    defaultValues: {
      notes: data.notes,
    },
  });
  const onSubmit = (val: AddNoteFormValues) => {
    try {
      console.log(val);
      console.log(status);
    } catch (error) {
      console.log(error);
    }
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
            ) : (
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <Textarea placeholder="Add your note" {...field} />
                  </FormItem>
                )}
              />
            )}

            <Button
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
