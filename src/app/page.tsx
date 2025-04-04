import { redirect } from "next/navigation";

export default async function Home({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;
  redirect(`/payin/${uuid}`);
}
