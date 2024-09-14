import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import * as XLSX from "xlsx";

interface DownloadButtonProps<TData> {
  data: TData[];
  name: string;
}

function DownloadButton<TData>({ data, name }: DownloadButtonProps<TData>) {
  const download = (data: TData[]) => {
    const exported = data.length ? data : [];
    const worksheet = XLSX.utils.json_to_sheet(exported);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${name}.xlsx`);
  };

  return (
    <Button onClick={() => download(data)} className="flex items-center">
      <DownloadIcon className="mr-2" />
      Download
    </Button>
  );
}

export default DownloadButton;
