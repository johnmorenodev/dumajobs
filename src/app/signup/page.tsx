import Form from "@/components/Form";
import Link from "next/link";

const Page = async () => {
  return (
    <>
      <h1>Sign up</h1>
      <Form action="/api/signup">
        <label htmlFor="username">Username</label>
        <input className="text-black" name="username" id="username" />
        <br />
        <label htmlFor="password">Password</label>
        <input
          className="text-black"
          type="text"
          name="password"
          id="password"
        />
        <br />
        <button className="mt-4 bg-blue-400 p-4">submit</button>
      </Form>
      <Link href="/login">Sign in</Link>
    </>
  );
};

export default Page;
