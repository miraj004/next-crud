import { TableBody, TableCell, TableRow } from "./ui/table"
import { Skeleton } from "./ui/skeleton"

export default function TableLoading() {
  return (
    <TableBody>
{Array.from({ length: 5 }).map((_, index) => (
  <TableRow key={index} className="hover:bg-muted/50 cursor-pointer">
    <TableCell className="p-4">
      <Skeleton className="h-6 w-24" />
    </TableCell>
    <TableCell className="p-4">
      <Skeleton className="h-6 w-48" />
    </TableCell>
  </TableRow>
))}
</TableBody>
  )
}