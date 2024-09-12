"use client";

import { createTicketAction } from "@/actions/createTicket";
import { CategoryType } from "@/app/(dashboard)/tiketing/_components/client";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TicketScemas } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface NewTicketModalProps {
  category: CategoryType[];
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
}

type CreateTicketFormValues = z.infer<typeof TicketScemas>;

export const NewTicketModal: React.FC<NewTicketModalProps> = ({
  category,
  isOpen,
  onClose,
  loading,
}) => {
  const router = useRouter();
  const form = useForm<CreateTicketFormValues>({
    resolver: zodResolver(TicketScemas),
    defaultValues: {
      informer: "",
      issue: "",
      category: "",
    },
  });

  const onConfirm = async (values: CreateTicketFormValues) => {
    try {
      await createTicketAction(
        values.informer,
        values.issue,
        values.category
      ).then((res) => {
        onClose();
        router.refresh();
        console.log(res);
        toast.success(res);
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Modal
      title="Create New Ticket"
      description="Please fill the form below to create a new ticket."
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onConfirm)}>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="informer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel autoFocus>Informer</FormLabel>
                  <Input
                    disabled={loading}
                    type="text"
                    placeholder="Informer"
                    {...field}
                    className="mt-4"
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormLabel>Category</FormLabel>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* on future map from database */}
                    {category.map((item: CategoryType) => (
                      <SelectItem
                        key={item.id}
                        value={JSON.stringify(item.id)}
                      >{`${item.kategori} - ${item.subkategori}`}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FormField
              control={form.control}
              name="issue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Issue</FormLabel>
                  <Textarea
                    disabled={loading}
                    placeholder="Issue"
                    {...field}
                    className="mt-4"
                  />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button variant="destructive" disabled={loading} onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} onClick={form.handleSubmit(onConfirm)}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
};
