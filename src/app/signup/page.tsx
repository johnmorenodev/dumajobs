import { SignupForm } from "@/app/signup/signup-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

const Page = async () => {
  return (
    <Card className="max-w-[400px] w-full mx-auto mt-24">
      <CardHeader>
        <h1 className="font-bold text-2xl">Signup</h1>
        <CardDescription>Fill up to sign up</CardDescription>
      </CardHeader>
      <CardContent>
        <SignupForm />
      </CardContent>
    </Card>
  );
};

export default Page;
