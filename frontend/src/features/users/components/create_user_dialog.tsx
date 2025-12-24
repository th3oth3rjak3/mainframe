import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Controller, useForm } from "react-hook-form";
import { CreateUserRequestSchema, type CreateUserRequest } from "../types";
import dayjs from "dayjs";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useUserStore } from "../stores/user_store";
import { toast } from "sonner";
import { HTTPError } from "ky";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@/components/ui/date_picker";

type CreateUserDialogProps = {
  onCreated: () => void;
};

export default function CreateUserDialog({ onCreated }: CreateUserDialogProps) {
  const createUser = useUserStore((store) => store.createUser);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateUserRequest>({
    resolver: zodResolver(CreateUserRequestSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      rawPassword: "",
      confirmPassword: "",
      passwordExpiration: dayjs().add(7, "days").toDate(),
    },
  });

  const onSubmit = async (request: CreateUserRequest) => {
    try {
      setIsLoading(true);
      await createUser(request);
      onCreated();
    } catch (err) {
      if (err instanceof HTTPError) {
        toast.error(err.message);
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("unexpected login error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Create User</Button>
        </DialogTrigger>
        <DialogContent closeOnClickOutside={false} closeOnEscapeKey={false}>
          <DialogTitle>Create New User</DialogTitle>
          <DialogDescription hidden>Make a new user account.</DialogDescription>
          <form id="create-user-form" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <FieldGroup>
                  <Controller
                    name="firstName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="create-user-form-firstname">First Name</FieldLabel>
                        <Input
                          {...field}
                          id="create-user-form-firstname"
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                </FieldGroup>
              </div>
              <div className="grid gap-2">
                <FieldGroup>
                  <Controller
                    name="lastName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="create-user-form-lastname">Last Name</FieldLabel>
                        <Input
                          {...field}
                          id="create-user-form-lastname"
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                </FieldGroup>
              </div>
              <div className="grid gap-2">
                <FieldGroup>
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="create-user-form-email">Email</FieldLabel>
                        <Input
                          {...field}
                          id="create-user-form-email"
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                </FieldGroup>
              </div>
              <div className="grid gap-2">
                <FieldGroup>
                  <Controller
                    name="username"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="create-user-form-username">Username</FieldLabel>
                        <Input
                          {...field}
                          id="create-user-form-username"
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                </FieldGroup>
              </div>
              <div className="grid gap-2">
                <FieldGroup>
                  <Controller
                    name="rawPassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="create-user-form-password">Password</FieldLabel>
                        <Input
                          {...field}
                          id="create-user-form-password"
                          type="password"
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                </FieldGroup>
              </div>
              <div className="grid gap-2">
                <FieldGroup>
                  <Controller
                    name="confirmPassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="create-user-form-confirmPassword">
                          Confirm Password
                        </FieldLabel>
                        <Input
                          {...field}
                          type="password"
                          id="create-user-form-confirmPassword"
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                </FieldGroup>
              </div>
              <div className="grid gap-2">
                <FieldGroup>
                  <Controller
                    name="passwordExpiration"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <DatePicker
                          {...field}
                          label="Password Expiration"
                          onDatePicked={(date) => (field.value = date ?? new Date())}
                          initialValue={field.value}
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                </FieldGroup>
              </div>
              <Button type="submit" className="w-full hover:cursor-pointer" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
