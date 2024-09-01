import { useEffect } from "react";

export default function FormInput({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  async function createInput(formData: FormData) {
    "use server";

    console.log("image haben wa");
    /* const rawFormData = {
      image: formData.get("image"),
    }; */

    // mutate data
    // revalidate cache
  }

  return (
    <form action={createInput} id="myform">
      {children}
    </form>
  );
}
