import AcceptQuoteDialog from "../../../components/accept-quote-dialog";

export default async function Home({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;
  return <AcceptQuoteDialog uuid={uuid} />;
}
