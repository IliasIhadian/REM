export default function FormInput(children: any) {
  async function createInput(formData: FormData) {
    "use server";
    const rawFormData = {
      image: formData.get("image"),
    };

    console.log("image haben wa");

    // mutate data
    // revalidate cache
  }

  return <form action={createInput}>{children}</form>;
}
