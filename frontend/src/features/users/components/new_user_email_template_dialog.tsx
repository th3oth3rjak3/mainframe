import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateRandomPassword } from "@/features/auth/password_utilities";
import { useMemo, useState } from "react";
import { Copy, RefreshCw } from "lucide-react";
import dayjs from "dayjs";

export default function NewUserEmailTemplateDialog() {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState(generateRandomPassword());
  const [username, setUsername] = useState("");
  const [expirationDays, setExpirationDays] = useState(7);
  const [copied, setCopied] = useState(false);

  const expirationDate = useMemo(
    () => dayjs(Date.now()).add(expirationDays, "day").toDate().toDateString(),
    [expirationDays]
  );

  const emailTemplate = `Welcome to Mainframe!

We've set up your new account and you'll need to log in to change your password for security reasons.

Username: ${username || "[USERNAME]"}
Password: ${password}
Password Expiration: ${expirationDays} days from account creation (${expirationDate})

Please log in at your earliest convenience to set a new password.

Best regards,
The Mainframe Team`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(emailTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegeneratePassword = () => {
    setPassword(generateRandomPassword());
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen) {
      // Reset state when opening
      setPassword(generateRandomPassword());
      setUsername("");
      setCopied(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">New User Email Template</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogTitle>New User Email Template</DialogTitle>
        <DialogDescription hidden>
          Generate an email template for welcoming a new user.
        </DialogDescription>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username (optional)</Label>
            <Input
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Generated Password</Label>
            <div className="flex gap-2">
              <Input id="password" value={password} readOnly className="font-mono" />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleRegeneratePassword}
                title="Regenerate password"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expiration">Password Expiration (days)</Label>
            <Input
              id="expiration"
              type="number"
              min="1"
              value={expirationDays}
              onChange={(e) => setExpirationDays(Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="template">Email Template</Label>
            <Textarea
              id="template"
              value={emailTemplate}
              readOnly
              rows={12}
              className="font-mono text-sm"
            />
          </div>

          <Button onClick={handleCopy} className="w-full">
            <Copy className="h-4 w-4 mr-2" />
            {copied ? "Copied!" : "Copy Template to Clipboard"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
