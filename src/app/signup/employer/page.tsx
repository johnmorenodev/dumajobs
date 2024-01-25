import { SignUp } from "@clerk/nextjs";

export default async function Page() {
  return (
    <section className="w-full mx-auto max-w-[800px] p-4 flex items-center justify-center">
      <SignUp
        unsafeMetadata={{
          role: "EMPLOYER",
        }}
      />
    </section>
  );
}
