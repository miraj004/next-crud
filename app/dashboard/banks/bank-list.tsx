import { getBanks, type Bank } from "@/actions/api/banks";
import TableLoading from "@/components/table-loading";
import { Table, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Unauthorized from "@/components/unauthorized";
import { Suspense } from "react";


export default async function BankList() {
  const result = await getBanks();

  if ("error" in result) {
    if (result.error === 'Unauthorized') {
      return <Unauthorized/>
    }

    return (
      <div className="text-center mt-8">
        <p className="text-red-500">{result.error}</p>
      </div>
    );
  }

  const banks: Bank[] = result; 

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-24">Code</TableHead>
          <TableHead>Bank Name</TableHead>
        </TableRow>
      </TableHeader>
      <Suspense fallback={<TableLoading />}>
        <tbody>
          {banks.map((bank) => (
            <TableRow key={bank.id} className="hover:bg-muted/50 cursor-pointer">
              <TableCell className="font-medium">{bank.code}</TableCell>
              <TableCell>{bank.name}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Suspense>
    </Table>
  );
}
