import { useEffect, useState } from "react";
import { useUserStore } from "../stores/user_store";
import type { UserBase } from "../types";
import { toast } from "sonner";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data_table";
import CreateUserDialog from "../components/create_user_dialog";
import z, { ZodError } from "zod";
import NewUserEmailTemplateDialog from "../components/new_user_email_template_dialog";

const columns: ColumnDef<UserBase>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "isDisabled",
    header: "Disabled",
    enableColumnFilter: false,
  },
  {
    accessorKey: "lastLogin",
    header: "Last Login",
    enableColumnFilter: false,
    cell: ({ row }) => {
      const loginDate = row.getValue("lastLogin") as Date | null;
      return loginDate?.toLocaleString();
    },
  },
];

export default function UsersList() {
  const getAllUsers = useUserStore((store) => store.getAllUsers);
  const [users, setUsers] = useState<UserBase[]>([]);

  const onCreated = () => {
    console.log("we created a new user");
  };

  useEffect(() => {
    getAllUsers()
      .then((u) => setUsers(u))
      .catch((err) => {
        if (err instanceof ZodError) {
          toast.error(z.prettifyError(err));
        } else if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("Error getting users");
        }
        console.error(err);
      });
  }, [getAllUsers]);

  return (
    <>
      <div className="flex gap-x-2">
        <CreateUserDialog onCreated={onCreated} />
        <NewUserEmailTemplateDialog />
      </div>
      <DataTable data={users} columns={columns} showColumnSelector filterable />
    </>
  );
}
