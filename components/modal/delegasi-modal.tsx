import { CategoryType } from "@/app/(dashboard)/tiketing/_components/client";
import { TicketColumn } from "@/app/(dashboard)/tiketing/_components/columns";
import { DelegasiSchemas } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form, FormField, FormItem, FormLabel } from "../ui/form";
import Modal from "../ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface DelegasiModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: TicketColumn;
  category: CategoryType[];
}

type DelegasiFormValue = z.infer<typeof DelegasiSchemas>;

export const DelegasiModal: FC<DelegasiModalProps> = ({
  isOpen,
  data,
  onClose,
  category,
}) => {
  const form = useForm<DelegasiFormValue>({
    resolver: zodResolver(DelegasiSchemas),
    defaultValues: {
      category: data.category,
    },
  });
  const onSubmit = (val: DelegasiFormValue) => {
    try {
      console.log(val);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      title="Pindah Tiket ke layanan lain"
      description=""
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-5">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
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
                </FormItem>
              )}
            />
            <Button type="submit">Delegasikan</Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
