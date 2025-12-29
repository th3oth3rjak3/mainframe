import { useSessionStore } from "@/features/sessions/stores/session_store";
import { useEffect, useState } from "react";
import type { SessionSummary } from "../types";
import * as z from "zod";
import { toast } from "sonner";
import { DataTable } from "@/components/ui/data_table";
import type { ColumnDef } from "@tanstack/react-table";
import { PageHeader } from "@/components/ui/page_header";

const columns: ColumnDef<SessionSummary>[] = [
  {
    accessorFn: (session) => session.user.firstName,
    id: "firstName",
    header: "First Name",
  },
  {
    accessorFn: (session) => session.user.lastName,
    id: "lastName",
    header: "Last Name",
  },
  {
    accessorFn: (session) => session.user.username,
    id: "username",
    header: "Username",
  },
  {
    accessorFn: (session) => session.user.email,
    id: "email",
    header: "Email",
  },
  {
    accessorFn: (session) => session.user.isDisabled,
    id: "disabled",
    header: "Disabled",
    enableColumnFilter: false,
  },
  {
    accessorFn: (session) => session.user.lastLogin,
    id: "lastLogin",
    header: "Last Login",
    enableColumnFilter: false,
    cell: ({ row }) => {
      const loginDate = row.getValue("lastLogin") as Date | null;
      return loginDate?.toLocaleString();
    },
  },
  {
    accessorKey: "activeSessions",
    header: "Active Sessions",
    enableColumnFilter: false,
  },
];

export default function SessionsList() {
  const [sessions, setSessions] = useState<SessionSummary[]>([]);
  const getSessionSummaries = useSessionStore((store) => store.getSessionSummaries);

  useEffect(() => {
    getSessionSummaries()
      .then((summaries) => setSessions(summaries))
      .catch((err) => {
        if (err instanceof z.ZodError) {
          toast.error(z.prettifyError(err));
        } else if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("Error getting session summaries");
        }
        console.error(err);
      });
  }, [getSessionSummaries]);

  return (
    <>
      <PageHeader title="Sessions" description="All active login sessions" />
      <DataTable data={sessions} columns={columns} showColumnSelector filterable />
    </>
  );
}
