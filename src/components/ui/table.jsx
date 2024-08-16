import * as React from "react"

const Table = React.forwardRef((props, ref) => (
  <div className="w-full overflow-auto">
    <table
      ref={ref}
      className="w-full caption-bottom text-sm"
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef((props, ref) => (
  <thead ref={ref} className="[&_tr]:border-b" {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef((props, ref) => (
  <tbody
    ref={ref}
    className="[&_tr:last-child]:border-0"
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableRow = React.forwardRef((props, ref) => (
  <tr
    ref={ref}
    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef((props, ref) => (
  <th
    ref={ref}
    className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef((props, ref) => (
  <td
    ref={ref}
    className="p-4 align-middle [&:has([role=checkbox])]:pr-0"
    {...props}
  />
))
TableCell.displayName = "TableCell"

export {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
}